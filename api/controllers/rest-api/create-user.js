module.exports = {


  friendlyName: 'Create user',


  description: '',


  inputs: {

  },


  exits: {
    success: {
      viewTemplatePath: 'pages/thankumsg'
    }
  },


  fn: async function (inputs) {

    let user = this.req.body;
    let userEmail = user.email.toLowerCase();
    let defaultPhoto = 'images/users/userDefault/image.jpg';
    await TestUser.create( { firstName: user.firstName, lastName: user.lastName, email: userEmail, password:user.password, gender:user.gender, dateOfBirth: user.dateOfBirth, radioAddress: user.radioAddress, address: user.address, photo: defaultPhoto, description: user.description,  points: 20, employeed: user.employeed, disabled: user.disabled,volunteer: user.volunteer, freeTime: user.freeTime, admin: false});
   
    return user;

  }


};
