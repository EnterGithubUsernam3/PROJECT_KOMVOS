module.exports = {


  friendlyName: 'Not enough points',


  description: '',


  inputs: {

  },


  exits: {
    success:{
      viewTemplatePath:'pages/notEnoughPoints'
    }

  },


  fn: async function (inputs) {
    let isAdmin = this.req.session.isAdmin;
    let photo = this.req.session.photo;

    // All done.
    return { isAdmin :isAdmin , photo:photo};

  }


};
