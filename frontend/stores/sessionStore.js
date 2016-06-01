var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _current_user = {};
var _currentUserHasBeenFetched = false;
var SessionStore = new Store(AppDispatcher);
var SessionConstants = require('../constants/sessionConstants');

SessionStore.currentUserHasBeenFetched = function () {
  return _currentUserHasBeenFetched;
};

SessionStore.isUserLoggedIn = function () {
  return !!_current_user.id;
};

SessionStore.currentUser = function () {
  return _current_user;
};

SessionStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SessionConstants.LOG_OUT:
      _currentUserHasBeenFetched = false;
      _current_user = {};
      this.__emitChange();
      break;
    case SessionConstants.LOG_IN:
      _currentUserHasBeenFetched = true;
      _current_user = payload.currentUser;
      this.__emitChange();
      break;
  }
};

module.exports = SessionStore;
