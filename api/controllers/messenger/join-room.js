module.exports = {


  friendlyName: 'Join room',


  description: '',


  inputs: {
  },


  exits: {

  },


  fn: async function () {
    const id = sails.sockets.getId(this.req);
    

    sails.sockets.join(id, this.req.session.userId, function (err, data) {
      if (err) {
        return res.serverError(err);
      }
      
    });
  
    // All done.
    return;

  }


};
