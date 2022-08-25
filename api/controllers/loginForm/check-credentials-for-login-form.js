
module.exports = {


  friendlyName: 'Check credentials for login form',


  description: '',


  inputs: {
    email: { type: 'string', required: true },
    password: { type: 'string', minLength: 8, required: true }

  },


  exits: {
    // success: {
    //   description: 'User found and sent to homepage',
    //   responseType: 'view',
    //   viewTemplatePath:'homepage'
   
    // },
    // admin : {
    //   description: 'Admin found and sent to admin panel',
    //   responseType: 'view',
    //   viewTemplatePath:'thankumsg'
    // }
    // success: {
    //   description:'lolol',
    //   responseType:'redirect'
    // }

  },


  fn: async function (inputs,res) {
    // console.log(inputs.email);
    // console.log(inputs.password);
    let user = await TestUser.findOne({
      where: { email: inputs.email, password: inputs.password }
    });
   


    // console.log(user);
    if(user == undefined)
    {
      // console.log("Είμαι στην if user undefined");
      
      return user;
    }
    else{
      // console.log("Είμαι στο else")
      // console.log(this.req.session);
      this.req.session.userId = user.id;
      this.req.session.isAdmin = user.admin;
      this.req.session.points = user.points;
      this.req.session.reservedPoints = user.reservedPoints;
      this.req.session.photo = user.photo
      // console.log(this.req.session);
      return user;

    }
    // console.log(this.req.session.isAdmin);
    // console.l

    // console.log(user);
    // sails.sockets.blast(user);



   
  }


};
