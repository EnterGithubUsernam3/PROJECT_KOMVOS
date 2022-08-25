module.exports = {


  friendlyName: 'Event',


  description: 'Event something.',


  inputs: {

  },


  exits: {
    success: {
      viewTemplatePath: 'pages/update-event'
    }
  },


  fn: async function (inputs) {
    // Find user in db
    let event = await Event.findOne({
       where: { id: 1 }
    });

    // All done.
    return  { event } ;
  }
};
