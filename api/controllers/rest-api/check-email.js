module.exports = {


  friendlyName: 'Check email',


  description: '',


  inputs: {
    email: { type: 'string', required: true }
  },


  exits: {

  },


  fn: async function (inputs) {
    let email = await TestUser.findOne({
                      where: { email: inputs.email}
    });
    
    // All done.
    return email;
    

  }


};
