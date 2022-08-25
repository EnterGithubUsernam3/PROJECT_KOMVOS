module.exports = {


  friendlyName: 'Update finished',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let arrangementInfo = this.req.body;

    //update the arrangements state to finished
    await Arrangement.updateOne({ id: arrangementInfo.id }).set({ status : "finished",  updatedAt: new Date()});

    // add one point to the offering user
    let offeringUserId = arrangementInfo.offererId;
    let offeringUserInfo = await TestUser.findOne({
      where: { id: offeringUserId },
      select: ['points']
    });

    let offeringUserPoints = offeringUserInfo.points;
    offeringUserPoints = offeringUserPoints + 1;
    sails.sockets.blast("updatedOfferedPoints",[offeringUserId,offeringUserPoints]);
    await TestUser.updateOne({ id: offeringUserId }).set({ points: offeringUserPoints });
    

    // subtract one point from the receiving user if the listings category is not 1 or 2
    //food or home
    let receivingUserId = arrangementInfo.receiverId;
    let categoryId = arrangementInfo.category_id;

    let receivingUserInfo = await TestUser.findOne({
      where: { id: receivingUserId },
      select: ['points']
    });

    let receivingUserPoints = receivingUserInfo.points;
    receivingUserPoints = receivingUserPoints - 1;
    let receivingUserReservedPoints = receivingUserInfo.reservedPoints;
    receivingUserReservedPoints = receivingUserReservedPoints - 1;
    if(this.req.session.userId == receivingUserId && categoryId !== 1 && categoryId !== 2 )
    { 
      this.req.session.points = this.req.session.points - 1 ;
      this.req.session.reservedPoints = this.req.session.reservedPoints - 1; 
    }
      
    if( categoryId !== 1 && categoryId !== 2) {
      await TestUser.updateOne({ id: receivingUserId }).set({ points: receivingUserPoints});
      
    }

    this.res.redirect('/userprofile');
    // All done.
    return;

  }


};
