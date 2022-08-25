
module.exports = {


  friendlyName: 'Logout',


  description: 'Logout something.',


  inputs: {

  },


  exits: {
 

  },


  fn: async function (inputs) {
    // console.log(this.res.session);
    // console.log(this.req.session);
    await TestUser.updateOne({id:this.req.session.userId}).set({points: this.req.session.points , reservedPoints:this.req.session.reservedPoints})
    this.req.session.cookie = { cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true }};
    this.req.session.userId = "";
    this.req.session.isAdmin = "";
    this.req.session.points = "";
    this.req.session.reservedPoints = "";
   
    // console.log(this.req.session);
    // All done.
    return this.res.redirect('http://localhost:1337');

  }


};
