module.exports = {


  friendlyName: 'Second case',


  description: 'All the arrangements in state pending, for listings that haven t yet expired and the user doesn t own them and he is either the receiver or offerer',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
   
    let listingsWithArrangements = await Listing.find({
        where: {
          user_id : { '!=' : this.req.session.userId }, 
          endingDate: { '>=': new Date() }       
        }
      }).populate('arrangements', { 
        where: { status: 'pending',
        or : [ { receiving_user_id: this.req.session.userId }, { offering_user_id: this.req.session.userId }]
      }
                
      });
        

    let properArrangements = [];

    for (let i = 0; i < listingsWithArrangements.length; i++) {
      if (listingsWithArrangements[i].arrangements.length !== 0) {
        properArrangements.push(listingsWithArrangements[i]);
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
        
        currentArrangement.id = properArrangements[j].arrangements[k].id;
        let receiving_user = await TestUser.findOne({
          where: { id: properArrangements[j].arrangements[k].receiving_user_id },
          select: ['firstName', 'lastName', 'email', 'photo']
        });
        currentArrangement.receiverId = receiving_user.id;
        currentArrangement.receiver = receiving_user.firstName + " " + receiving_user.lastName;
        currentArrangement.receiverMail = receiving_user.email;
        currentArrangement.receiverPhoto = receiving_user.photo;


        let offering_user = await TestUser.findOne({
          where: { id: properArrangements[j].arrangements[k].offering_user_id },
          select: ['firstName', 'lastName', 'email', 'photo']
        });
        currentArrangement.offererId = offering_user.id;
        currentArrangement.offerer = offering_user.firstName + " " + offering_user.lastName;
        currentArrangement.offererMail = offering_user.email;
        currentArrangement.offererPhoto = offering_user.photo;

        currentArrangement.createdAt = properArrangements[j].arrangements[k].createdAt;
        currentArrangement.status = properArrangements[j].arrangements[k].status;
        currentArrangement.id = properArrangements[j].arrangements[k].id;

        dto.push(currentArrangement);
      }
    }

    // εδω πανε οι συμφωνιες στις οποιες ο χρηστης 1 ειναι ο receiver
    let offeringListing = [];
    // εδω πανε οι συμφωνιες στις οποιες ο χρηστης 1 ειναι ο offerer
    let receivingListing= [];


    for(let f = 0; f < dto.length; f++){
        if(dto[f].receiverId == 1){
          offeringListing.push(dto[f]);
        }
        else {
          receivingListing.push(dto[f]);
        }
    }

    let secondCaseResult = [];
    secondCaseResult.push(offeringListing);
    secondCaseResult.push(receivingListing);
    // All done.
    
    return secondCaseResult;

  }


};
