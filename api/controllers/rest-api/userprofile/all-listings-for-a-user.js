const { User } = require("../../view-models/UserListingArrangement")
module.exports = {


  friendlyName: 'Joinroom',


  description: 'Joinroom something.',


  inputs: {
  },


  exits: {

  },


  fn: async function (inputs) {
    
    let id = sails.sockets.getId(this.req)
    sails.sockets.join(id, 'userProfileDto', function (err) {
    });
    
  
    let userListing = await Listing.find({
      where: {
        user_id: this.req.session.userId,
      }
    })

  
    let listingsUserDto = new User(userListing)
    
    await listingsUserDto.listingQueryToDto()

    return listingsUserDto.dto
  }


};
