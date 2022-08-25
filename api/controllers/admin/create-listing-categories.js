
module.exports = {


  friendlyName: 'Create listing categories',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let listingCategories = this.req.body
    let categorie = await ListingCategories.create({ name: listingCategories.name, description: listingCategories.description }).fetch();
    sails.sockets.blast('newAdminCategorie', categorie );
    this.res.redirect('/admin')
    return listingCategories;

  }


};
