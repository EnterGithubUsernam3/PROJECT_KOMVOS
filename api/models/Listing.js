/**
 * Listing.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'listing',
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    user_id: { model : 'testuser', required: true},
    category_id: { model: 'listingcategories', required: true},
    createdAt: { type: 'ref', columnType: 'timestamp', defaultsTo: new Date() },
    updatedAt: { type: 'ref', columnType: 'timestamp', defaultsTo: new Date() },
    name: {type:'string', required: true, maxLength: 200}, 
    description: {type:'string', maxLength: 500, required: true}, 
    startingDate: { type: 'string', required: true, columnName: 'startingdate', columnType: 'date'},
    endingDate: { type: 'string', required: true, columnName: 'endingdate', columnType: 'date'},
    isOffered: { type: 'boolean', required: true, columnName: 'isoffered' },
    status: {type:'string', defaultsTo:'active', isIn: ['active', 'inactive']},

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    arrangements: {
      collection: 'arrangement',
      via: 'listing_id'
    },
  },

};

