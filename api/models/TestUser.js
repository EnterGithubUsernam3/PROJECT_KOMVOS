/**
 * TestUser.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'test_user',
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    firstName: { type: 'string', required: true, columnName: 'first_name' },
    lastName: { type: 'string', required: true, columnName: 'last_name' },
    email: { type: 'string', required: true, isEmail: true, unique: true, maxLength: 200},
    password: {type:'string', required: true, },
    gender: {type:'string', required: true, isIn: ['Male', 'Female', 'Non-Binary'] },
    dateOfBirth: { type: 'string', required: true, columnName: 'date_of_birth', isAfter: new Date('Mon Jan 01 1940 00:00:00 GMT-0000'), isBefore: new Date('Thr Jan 01 2004 00:00:00 GMT-0000'), columnType: 'date'}, //
    radioAddress: { type:'boolean', required: true},
    address: { type: 'string', required: false }, 
    photo: {type:'string'},
    description: {type:'string', maxLength: 250, required: true},
    points: { type: 'number', required: true, isInteger: true },
    employeed: { type:'boolean', required: true},
    disabled: { type:'boolean', required: true},
    volunteer: { type:'boolean', required: true},
    freeTime: { type:'string', required: true, columnName:'free_time', isIn: ['freeTimeNone', 'freeTimeMinimum', 'freeTimeWeekend', 'freeTimeSome'] }, //isIn: ['ΚΑΘΟΛΟΥ', 'ΜΕΡΙΚΩΣ', 'Σ-Κ']
    admin: { type: 'boolean', required: true },
    reservedPoints : {type: 'number', required: false, isInteger: true},

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    categories: {
      collection: 'categories',
      via: 'user_id',
      through: 'usercategories'
    },
    listings: {
      collection: 'listing',
      via: 'user_id',
    },
    events: {
      collection: 'event',
      via: 'user_id'
    },
    arrangements: {
      collection: 'arrangement',
      via: 'offering_user_id'
    },
    arrangements: {
      collection: 'arrangement',
      via: 'receiving_user_id'
    },
    messages: {
      collection: 'chatmessages',
      via: 'user1'
    },
    messages: {
      collection: 'chatmessages',
      via: 'user2'
    }
  },

};

