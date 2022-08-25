module.exports = {


  friendlyName: 'Update event',


  description: '',


  inputs: {

  },


  exits: {
    success: {
      viewTemplatePath: 'pages/update-event'
    }
  },


  fn: async function (inputs) {

    let event = this.req.body;
    
    const updatedEvent = await Event.updateOne({id:1}).set(event);

    return { event:updatedEvent };

  }


};
