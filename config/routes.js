/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'GET /': { action : 'homepage' },
  'GET /register': {view: 'pages/registration'},
  'GET /login'   : {action :'loginForm/view-login-form' },
  'GET /thankyou': { view : 'pages/thankumsg'},
  'GET /listings-offered': {action : 'listings-pages/listings-offered-static'},
  'GET /listings-received': {action : 'listings-pages/listings-received-static'},
  'POST /all-listings-offered': {action : 'listings-pages/listings-offered'},
  'POST /all-listings-received': {action : 'listings-pages/listings-received'},
  'GET /events': { action : 'events-pages/events'},
  'GET /create'  : {action:'create'},
  'GET /delete' : { action : 'delete'},
  'GET /userprofile': { action: "user" },
  'POST /updateuser' : {action: "update-user"},
  'POST /rest': {action:"rest-api/create-user"},
  'POST /userprofileoffered': {action: 'rest-api/user-profile-offering'},
  'POST /userprofilereceived' : {action:'rest-api/user-profile-receiving'},
  'POST /listing-categories' : {action : 'listings-pages/listing-categories'},
  'POST /create-listing': {action:"listings-pages/create-listing"},
  'POST /create-event': {action:"events-pages/create-event"},
  'GET /update-event': { action: "event" },
  'POST /updateevent' : {action: "update-event"},
  'POST /register/check-email': { action: "rest-api/check-email"},
  'GET /chat': { action: 'messenger/chat' },
  'GET /chat/:userId': { action: 'messenger/chat' },
  'POST /message': { action: 'messenger/chat-message' },
  'GET /messages/:userId' : {action: 'messenger/get-messages'},
  'POST /joinroom': {action: 'messenger/join-room'},
  'GET /donation' : {action: 'donation'},
  'POST /restlistingcategories': {action:"admin/create-listing-categories"},
  'POST /updatelistingcategories' : {action: "admin/update-listing-categories"},
  'GET /admin': {action : 'admin/all-listing-categories'},
  'POST /delete': { action: "admin/delete-listing-categories"}, 
  'POST /create-arrangement-offered': { action: "arrangements-create-update/create-arrangement-offered"},
  'POST /create-arrangement-received': { action: "arrangements-create-update/create-arrangement-received"},
  'POST /first-case' : { action: "active-arrangements/first-case"},
  'POST /second-case' : { action: "active-arrangements/second-case"},
  'POST /third-case' : { action: "active-arrangements/third-case"},
  'POST /fourth-case' : { action: "active-arrangements/fourth-case"},
  'POST /update-canceled' : { action: "arrangements-create-update/update-canceled" } ,
  'POST /update-accepted' : { action: "arrangements-create-update/update-accepted" } ,
  'POST /update-finished' : { action: "arrangements-create-update/update-finished" } ,
  'POST /loginForm/checkCredentials' : {action :'loginForm/check-credentials-for-login-form'},
  'GET /logout' : {action : 'logout'},
  'GET /notEnoughPoints' : {action : 'not-enough-points'},
  'POST /user/avatar' : {action : 'rest-api/upload-picture'},
  'POST /point-balance': { action : 'listings-pages/point-balance'},
  'GET /view-profile/:userId': { action: 'view-profile' },
  'POST /all-listings-for-a-user': {action:'rest-api/userprofile/all-listings-for-a-user'},
  'POST /listing-delete-or-update': {action:'rest-api/userprofile/listing-delete-or-update'},
  'POST /receive-or-offer-listings-with-arrangements': {action:'rest-api/userprofile/receive-or-offer-listings-with-arrangements'},
  'GET /successfully-uploaded': { view : 'pages/successfully-uploaded'},

  
  

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
