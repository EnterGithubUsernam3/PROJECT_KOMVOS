module.exports = {


  friendlyName: 'Create arrangmenet offered',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let arrangementOffered = this.req.body;
   

    if (this.req.session.points - this.req.session.reservedPoints > 0) {

      await Arrangement.create({
        offering_user_id: arrangementOffered.offering_user_id, receiving_user_id: this.req.session.userId, listing_id: arrangementOffered.listing_id,
        status: "pending"
      });

     
      
      
      if(arrangementOffered.category_id !== "1" && arrangementOffered.category_id !== "2")
      {
        this.req.session.reservedPoints = this.req.session.reservedPoints + 1;
      

      }
      
      this.res.redirect('/listings-offered');
    }
    else {
      if(arrangementOffered.category_id == "1" || arrangementOffered.category_id == "2")
      {
        await Arrangement.create({
          offering_user_id: arrangementOffered.offering_user_id, receiving_user_id: this.req.session.userId, listing_id: arrangementOffered.listing_id,
          status: "pending"
        });
        this.res.redirect('/listings-offered');
      }
      else{

        this.res.redirect("/notEnoughPoints");
      }
    }

  

    return ;

  }


};