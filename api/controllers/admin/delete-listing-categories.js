module.exports = {


  friendlyName: 'Delete listing categories',


  description: '',


  inputs: {

  },


  exits: {
 
  },


  fn: async function (inputs) {
    // Find listing in db
    let categories = await ListingCategories.updateOne({
      id: this.req.body.id
    }).set({
      status: 'inactive'
    })
    sails.sockets.blast('newAdminCategorie');
    this.res.redirect('/admin')
    // All done.
    return  { categories } ;
  }
};
