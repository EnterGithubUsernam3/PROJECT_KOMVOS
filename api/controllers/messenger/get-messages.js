module.exports = {


  friendlyName: 'Get messages',


  description: '',


  inputs: {
  },


  exits: {

  },


  fn: async function () {
    let user = await TestUser.findOne({ id: this.req.param('userId')});


    let messages = await ChatMessages.find({
      select: ['text', 'createdAt', 'user1', 'user2'],
      where: {
        user1: { in: [this.req.session.userId, this.req.param('userId')]},
        user2: { in: [this.req.session.userId, this.req.param('userId')]}
      }
    }).sort('createdAt ASC');

    return { messages, user };
  }


};
