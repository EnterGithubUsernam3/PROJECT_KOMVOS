module.exports = {


  friendlyName: 'Create event',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let event = this.req.body;
    await Event.create( {  title:event.title, user_id: this.req.session.userId, description:event.description, startingDate:event.startingDate, endingDate: event.endingDate });
    this.res.redirect('/events');
    return 

  }


};
