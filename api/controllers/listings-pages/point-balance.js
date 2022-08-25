module.exports = {


  friendlyName: 'Point balance',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function () {

    let pointBalance = this.req.session.points - this.req.session.reservedPoints;
    return pointBalance;

  }


};
