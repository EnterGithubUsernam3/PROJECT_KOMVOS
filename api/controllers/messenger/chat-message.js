module.exports = {


  friendlyName: 'Chat message',


  description: '',


  inputs: {
    user2: { type: 'number', required: true },
    text: { type: 'string', required: true }
  },


  exits: {

  },


  fn: async function ({ user2, text }) {

    let message = await ChatMessages.create({ user1: this.req.session.userId, user2, text }).fetch();

    if (this.req.isSocket) {
      sails.sockets.broadcast(user2, 'message', {text, user: this.req.session.userId, createdAt: message.createdAt});
    }

    return message;

  }


};    
