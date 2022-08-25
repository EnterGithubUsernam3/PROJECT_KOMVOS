module.exports = {


  friendlyName: 'Create arrangement received',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    let arrangementReceived = this.req.body;
    
    let arrangement = await Arrangement.create({
      offering_user_id: this.req.session.userId, receiving_user_id: arrangementReceived.receiving_user_id, listing_id: arrangementReceived.listing_id,
      status: "pending"
    });
    
    // ideally redirect to userprofile
    this.res.redirect('/listings-received');
    return;
    // All done.
  

  }


};
