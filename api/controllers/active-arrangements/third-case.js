module.exports = {


  friendlyName: 'Third case',


  description: 'state 2 , offerer, X owner or owner',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    
    let arrangement = await Arrangement.find({
      where: {
        status: 'accepted',
        offering_user_id : this.req.session.userId,
      },
      select: ['listing_id']
    });

    let listingIds = arrangement.map(element => element.listing_id);

    let listingsWithArrangements = await Listing.find({
      where: {
        id : { in :  listingIds }, 
        endingDate: { '>=': new Date() }       
      }
    }).populate('arrangements', { where: { status: 'accepted', offering_user_id: this.req.session.userId } });

    let dto = [];
    for (let j = 0; j < listingsWithArrangements.length; j++) {
      for (let k = 0; k < listingsWithArrangements[j].arrangements.length; k++) {
        let currentArrangement = {};
        currentArrangement.listingId = listingsWithArrangements[j].id;
        currentArrangement.listingName = listingsWithArrangements[j].name;
        currentArrangement.isOffered = listingsWithArrangements[j].isOffered;
        currentArrangement.listingDescription = listingsWithArrangements[j].description;
        currentArrangement.startingDate = listingsWithArrangements[j].startingDate;
        currentArrangement.endingDate = listingsWithArrangements[j].endingDate;
        let categoryName = await ListingCategories.findOne({
          where: {
            id: listingsWithArrangements[j].category_id
          },
          select: ['name']
        });

        currentArrangement.category = categoryName.name;
        currentArrangement.id = listingsWithArrangements[j].arrangements[k].id;

        let receiving_user = await TestUser.findOne({
          where: { id: listingsWithArrangements[j].arrangements[k].receiving_user_id },
          select: ['firstName', 'lastName', 'email', 'photo']
        });
        currentArrangement.receiverId = receiving_user.id;
        currentArrangement.receiver = receiving_user.firstName + " " + receiving_user.lastName;
        currentArrangement.receiverMail = receiving_user.email;
        currentArrangement.receiverPhoto = receiving_user.photo;


        let offering_user = await TestUser.findOne({
          where: { id: listingsWithArrangements[j].arrangements[k].offering_user_id },
          select: ['firstName', 'lastName', 'email']
        });
        currentArrangement.offererId = offering_user.id;
        currentArrangement.offerer = offering_user.firstName + " " + offering_user.lastName;
        currentArrangement.offererMail = offering_user.email;

        currentArrangement.createdAt = listingsWithArrangements[j].arrangements[k].createdAt;
        currentArrangement.updatedAt = listingsWithArrangements[j].arrangements[k].updatedAt;
        currentArrangement.status = listingsWithArrangements[j].arrangements[k].status;

        dto.push(currentArrangement);
      }
    }

    // All done.
    return dto;

  }


};
