module.exports = {


  friendlyName: 'Donation',


  description: 'Donation something.',


  inputs: {

  },


  exits: {
    success:{
      viewTemplatePath:'pages/donation'
    }

  },


  fn: async function (inputs) {
    let isAdmin = this.req.session.isAdmin;
    let photo = this.req.session.photo;
    // All done.
    return {isAdmin : isAdmin, photo:photo};

  }


};
