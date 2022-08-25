

module.exports = {


  friendlyName: 'Listings Offered',


  description: 'Renders the page listings offered with the listings and the user',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let interimUser;

    if (this.req.session.userId) {
      interimUser = this.req.session.userId;

    }
    else {
      interimUser = 150000;
    }

    let listings = await Listing.find({
      where: {
        user_id: { '!=': interimUser },
        isOffered: true,
        // add another constraint  : show only the active listings (fotis implementation)
        endingDate: { '>=': new Date() }
      }
    }).populate('arrangements', {
      where: {
        status: { in: ['pending', 'accepted'] },
        receiving_user_id: interimUser
      }
    });


    let rightListingIds = [];
    let rightListingUsers = [];

    for (let i = 0; i < listings.length; i++) {
      if (listings[i].arrangements.length == 0) {
        rightListingIds.push(listings[i].id);
        rightListingUsers.push(listings[i].user_id);
      }
    }

    let userListings = await TestUser.find({
      where: { id: { in: rightListingUsers } }
    }).populate('listings', {
      where: {
        id: { in: rightListingIds },
        isOffered: true,
        endingDate: { '>=': new Date() }
      }
    });

    let listingsWithUsers = [];



    const msPerYearNormal = 31557600000;
    const msPerYearLarge = 31622400000;
    const msPerYear = (3 * msPerYearNormal + msPerYearLarge) / 4;


    for (let i = 0; i < userListings.length; i++) {

      //we probably need the photo of the user at this point

      for (let j = 0; j < userListings[i].listings.length; j++) {
        let currentListing = {};
        currentListing.userId = userListings[i].id;
        currentListing.fullname = userListings[i].firstName + " " + userListings[i].lastName;
        currentListing.email = userListings[i].email;
        currentListing.photo = userListings[i].photo;
        let dateOfBirth = userListings[i].dateOfBirth;
        dateOfBirth = new Date(dateOfBirth);
        currentListing.age = Math.floor((Date.now() - dateOfBirth) / (msPerYear));

        currentListing.status = userListings[i].listings[j].status
        currentListing.id = userListings[i].listings[j].id;
        currentListing.name = userListings[i].listings[j].name;
        currentListing.startingDate = userListings[i].listings[j].startingDate;
        currentListing.endingDate = userListings[i].listings[j].endingDate;
        currentListing.description = userListings[i].listings[j].description;

        let categoryName = await ListingCategories.findOne({
          where: {
            id: userListings[i].listings[j].category_id
          },
          select: ['name']
        });
        currentListing.category_id = userListings[i].listings[j].category_id;
        currentListing.category = categoryName.name;

        listingsWithUsers.push(currentListing);
      }

    }


    return [listingsWithUsers,interimUser];
  }


};