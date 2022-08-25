module.exports = {


  friendlyName: 'Listing categories',


  description: '',


  inputs: {

  },


  exits: {
  },



  fn: async function (inputs) {
    // Find user in db
    let categories = await ListingCategories.find(
      { where: {status: 'active'},
        select: ['name'],
        sort: 'id ASC'
      },

    );
    // All done.
    return categories;
  }
};
