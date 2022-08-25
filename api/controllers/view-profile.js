module.exports = {


  friendlyName: 'View profile',


  description: 'Display "Profile" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/view-profile'
    }

  },


  fn: async function () {
    let user = await TestUser.findOne({
      where: { id: this.req.param('userId') }
    });
    let isAdmin = this.req.session.isAdmin;
    let photo = this.req.session.photo;
    return {user,isAdmin ,photo};

  }


};
