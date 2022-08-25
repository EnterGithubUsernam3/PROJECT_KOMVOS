module.exports = {


  friendlyName: 'Listing delete',


  description: '',


  inputs: {
    event: { type:'string', required:true},
    listingId: { type: 'number', required: true },
    updatedListing: {type:{}, required:false}
  },


  exits: {

  },


  fn: async function (inputs) {
    
    /* In this controller two of the three inputs are required in any case of event. More specific we need to know the type of
    event "edit" or "delete" and the listing ID so the server knows which listing to process. In the case of the "edit" event 
    the third input is required aswell which holds all the necessary data to update the given listing in the database. At the
    end of each of the two case events the socket "updateDto" event is being broadcasted to the "useProfileDto" room.
    */

    if (inputs.event == 'delete'){
      let listingsToCancel = await Listing.updateOne({
        id: inputs.listingId
      }).set({
        status: 'inactive'
      }).fetch()
  
      let arrangementsToCancel = await Arrangement.update({
        listing_id: inputs.listingId
      }).set({
        status: 'canceled'
      }).fetch();
      if (arrangementsToCancel.length == 0 ){
        await Listing.destroyOne({id:inputs.listingId})
      } 
      sails.sockets.broadcast('userProfileDto', 'updateDto');
      return 
    } 
    else if (inputs.event == 'edit'){
      let updated = await Listing.updateOne({
        id: inputs.listingId
      }).set({
        name: inputs.updatedListing.name,
        description: inputs.updatedListing.description,
        startingDate: inputs.updatedListing.startingDate,
        endingDate: inputs.updatedListing.endingDate
      })
      sails.sockets.broadcast('userProfileDto', 'updateDto');
      return updated
    } 

    return ;
  }


    // All done.
    
}


