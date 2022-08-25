module.exports = {


  friendlyName: 'All listing categories',


  description: '',


  inputs: {

  },


  exits: {
    success: {
      viewTemplatePath: 'pages/admin'
    }
  },



  fn: async function (inputs) {
    // Find user in db
    let photo = this.req.session.photo;
    let categories = await ListingCategories.find({where:{status:'active'}, select: ['name'] ['description']})

    // All done.
    return  { categories, photo } ;
  }
};
