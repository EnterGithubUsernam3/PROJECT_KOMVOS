


module.exports = {


  friendlyName: 'Update canceled',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    let arrangementId = this.req.body;

    let receivingUser = await Arrangement.findOne({ where: { id: arrangementId.id }, select: ["receiving_user_id"] });
    console.log(receivingUser);
    let reservedPoints = await TestUser.findOne({ where: { id: receivingUser.receiving_user_id }, select: ['reservedPoints'] });
    if (this.req.session.userId == receivingUser.receiving_user_id) {
      this.req.session.reservedPoints = this.req.session.reservedPoints - 1;
    }
    await TestUser.updateOne({ id: receivingUser.receiving_user_id }).set({ reservedPoints: reservedPoints.reservedPoints - 1 })
    await Arrangement.updateOne({ id: arrangementId.id }).set({ status: "canceled", updatedAt: new Date() });
    this.res.redirect('/userprofile');
    // All done.
    return;

  }


};
