/**
 * ChatMesseges.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName : 'chatmessages',
  attributes: {

    user1: {
      model: 'testuser',
      required: true
    },

    user2: {
      model: 'testuser',
      required: true
    },

    text: {
      type: 'string',
      required: true
    },
  },

};

