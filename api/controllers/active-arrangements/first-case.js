module.exports = {


  friendlyName: 'First case',


  description: 'state 1, owner, receiver or offerer',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    let listings = await Listing.find({
      where: {
        user_id: this.req.session.userId,
        endingDate: { '>=': new Date() }
      }
    }).populate('arrangements', { where: { status: 'pending' } });

    // because the above query returns some listings without arrangements
    // we sort once again to retreive proper data
    let properArrangements = [];

    for (let i = 0; i < listings.length; i++) {
      if (listings[i].arrangements.length > 0) {
        properArrangements.push(listings[i]);
      }
    }

    let dto = [];
    for (let j = 0; j < properArrangements.length; j++) {
      for (let k = 0; k < properArrangements[j].arrangements.length; k++) {
        let currentArrangement = {};
        currentArrangement.listingId = properArrangements[j].id;
        currentArrangement.listingName = properArrangements[j].name;
        currentArrangement.isOffered = properArrangements[j].isOffered;
        currentArrangement.listingDescription = properArrangements[j].description;
        currentArrangement.startingDate = properArrangements[j].startingDate;
        currentArrangement.endingDate = properArrangements[j].endingDate;
        let categoryName = await ListingCategories.findOne({
          where: {
            id: properArrangements[j].category_id
          },
          select: ['name']
        });

        currentArrangement.category = categoryName.name;

        let receiving_user = await TestUser.findOne({
          where: { id: properArrangements[j].arrangements[k].receiving_user_id },
          select: ['firstName', 'lastName', 'email', 'photo']
        });
        
        currentArrangement.id = properArrangements[j].arrangements[k].id;
        currentArrangement.receiver = receiving_user.firstName + " " + receiving_user.lastName;
        currentArrangement.receiverId = properArrangements[j].arrangements[k].receiving_user_id;
        currentArrangement.receiverMail = receiving_user.email;
        currentArrangement.receiverPhoto = receiving_user.photo;


        let offering_user = await TestUser.findOne({
          where: { id: properArrangements[j].arrangements[k].offering_user_id },
          select: ['firstName', 'lastName', 'email', 'photo']
        });
        
        currentArrangement.offerer = offering_user.firstName + " " + offering_user.lastName;
        currentArrangement.offererId = properArrangements[j].arrangements[k].offering_user_id;
        currentArrangement.offererMail = offering_user.email;
        currentArrangement.offererPhoto = offering_user.photo;

        currentArrangement.createdAt = properArrangements[j].arrangements[k].createdAt;
        currentArrangement.status = properArrangements[j].arrangements[k].status;

        dto.push(currentArrangement);
      }
    }

    let offered = [];
    let received = [];


    for(let f = 0; f < dto.length; f++){
        if(dto[f].isOffered == true){
          offered.push(dto[f]);
        }
        else {
          received.push(dto[f]);
        }
    }

    let firstCaseResult = [];
    firstCaseResult.push(offered);
    firstCaseResult.push(received);


    // All done.
    return firstCaseResult;

  }


};
