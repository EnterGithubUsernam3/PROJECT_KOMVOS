

module.exports = {


  friendlyName: 'Update listing categories',


  description: '',


  inputs: {

  },


  exits: {
    // success: {
    //   viewTemplatePath: 'pages/admin'
    // }
  },


  fn: async function (inputs) {

    let categories = this.req.body;
    await ListingCategories.updateOne({
      id: categories.id
    }).set({
      status: 'inactive'
    })
    
    await ListingCategories.create( {name: categories.name, description: categories.description});
    sails.sockets.blast('newAdminCategorie');
    this.res.redirect('/admin')
    return 

  }


};
