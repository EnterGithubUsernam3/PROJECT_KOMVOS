
module.exports = {


  friendlyName: 'Delete',


  description: 'Delete something.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    //await Listing.updateOne({ id: 6 }).set({ endingDate : "2022-04-30"});
    // let userPoints = await TestUser.findOne({ 
    //   where: { id: 3 },
    //     select: ['points']
    // });
    // let points = userPoints.points;
    // points = points - 1;
    // await TestUser.updateOne( { firstName: "Nikos", lastName: "Karapas", email: "nikoskar@gmail.com", password:"123456789", gender:"Male", dateOfBirth: "1950-02-02", radioAddress: 'true', address: "Panepistimiou 39", photo:'a', description:'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam omnis earum laborum esse nemo, aliquam ullam delectus eaque facere quae quis quam labore maxime cumque.',  points: 20, employeed: 'false', disabled: 'false', volunteer: 'false', freeTime: 'freeTimeNone', admin: true}).fetch();
     await TestUser.updateOne({ id: 3 }).set({ points : 2});
    //  await Arrangement.updateOne({ id: 1 }).set({ status : "canceled"});
    //  await Arrangement.updateOne({ id: 2 }).set({ status : "canceled"});
    //  await Arrangement.updateOne({ id: 3 }).set({ status : "canceled"});
    //  await Arrangement.updateOne({ id: 4 }).set({ status : "canceled"});
    // await Arrangement.updateOne({ id: 1 }).set({ status : "accepted"});
    // await Arrangement.updateOne({ id: 8 }).set({ status : "accepted"});
    // await Listing.create( { user_id: 2, category_id: 1, name: 'Η Εύα ζητάει', description:'Η Εύα ζητάει μία υπηρεσία για τεστ', startingDate: "2022-03-02", endingDate: "2022-06-30", isOffered: false }).fetch();
    // await Arrangement.create ( {offering_user_id: 1, receiving_user_id: 2, listing_id: 6, pointsOfTransaction:1, status:'pending'}).fetch();
    // await Arrangement.updateOne({ id: 3 }).set({ status : "accepted"});
    // await Arrangement.updateOne({ id: 10 }).set({ status : "accepted", listing_id : 6, offering_user_id: 2});
    //await Arrangement.destroyOne({ id: 23});
    // await Arrangement.destroyOne({ id: 13});
    // await Arrangement.destroyOne({ id: 14});
    // await Arrangement.destroyOne({ id: 15});
    // await Arrangement.destroyOne({ id: 16});
    // await Arrangement.destroyOne({ id: 17});
    //  await Event.destroyOne({ id: 1});
   // await ChatMessages.create( { text: "hello", user1: 2, user2: 3}).fetch();
    // All done.
    return 
     ;

  }


};
