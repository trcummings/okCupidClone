var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var UserConstants = require('../constants/userConstants');
var SessionStore = require('./sessionStore');

var _users = [];
var _viewedUser = {};

var UserStore = new Store(AppDispatcher);

UserStore.allUsers = function () {
  var currentUser = SessionStore.currentUser();

  if (currentUser.username) {
    var cUserIdx = _users.indexOf(currentUser);
    _users.splice(cUserIdx, 1);
  }
  // NOT INCL. THE CURRENT USER
  return _users;
};

UserStore.addUsersToStore = function (users) {
  _users = users;
};

UserStore.viewedUser = function () {
  return _viewedUser;
};

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case UserConstants.GET_ALL_POSSIBLE_MATCHES:
      this.addUsersToStore(payload.users);
      this.__emitChange();
      break;
    case UserConstants.RECEIVE_SINGLE_USER:
      _viewedUser = payload.user;
      this.__emitChange();
      break;
    }
};

module.exports = UserStore;
