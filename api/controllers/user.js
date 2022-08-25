module.exports = {


  friendlyName: 'User',


  description: 'User something.',


  inputs: {

  },

  exits: {
    success: {
      viewTemplatePath: 'pages/userprofile'
    }
  },


  fn: async function (inputs) {
    // Find user in db
    // console.log(this.req.session);
    let isAdmin = this.req.session.isAdmin;
    let userId = this.req.session.userId;
    let points = this.req.session.points;
    let user = await TestUser.findOne({
       where: { id: this.req.session.userId }
    });
    console.log(this.req.isSocket);
    sails.sockets.join(this.req,"updatedOfferedPoints", function (err, data) {
      if (err) {
        return res.serverError(err);
      }
      else{
        if(data[0] == userId)
        {
          console.log(data[0]);
          points = data[1];
          console.log(points);

        }
      }
    });
    this.req.session.points = points;
    console.log(this.req.session.points);

    let pointsBalance = this.req.session.points - this.req.session.reservedPoints;
    // All done.
    return  { user : user, pointsBalance : pointsBalance, isAdmin:isAdmin } ;
  }
};


 