// var Store = require('flux/utils').Store;
// var AppDispatcher = require('../dispatcher/dispatcher');
// var LikeConstants = require('../constants/likeConstants');
// var SessionStore = require('./sessionStore');
//
// var _likedUsers;
//
// var LikeStore = new Store(AppDispatcher);
//
// LikeStore.doesCurrentUserLikeThisUser = function (user) {
//   if (_likedUsers.indexOf(user.id) === -1) {
//     return false;
//   } else {
//     return true;
//   }
// };
//
// LikeStore.__onDispatch = function (payload) {
//   switch(payload.actionType) {
//     case LikeConstants.GET_ALL_USERS:
//       break;
//     }
//     this.__emitChange();
// };
//
// module.exports = LikeStore;
