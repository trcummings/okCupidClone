var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var _current_user = {};
var _birthday = '';
var _currentUserHasBeenFetched = false;
var SessionStore = new Store(AppDispatcher);
var SessionConstants = require('../constants/sessionConstants');

SessionStore.currentUserHasBeenFetched = function () {
  return _currentUserHasBeenFetched;
};

SessionStore.isUserLoggedIn = function () {
  return !!_current_user.username;
};

SessionStore.currentUser = function () {
  return _current_user;
};

SessionStore.birthDay = function () {
  return _birthday;
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
    case SessionConstants.ADD_USER_TO_LIKES:
      _current_user.likees.push(payload.otherUser);
      var mutuIdx = _current_user.likers.indexOf(payload.otherUser);
      if (mutuIdx === -1) {
        _current_user.mutual_likes.push(payload.otherUser);
      }

      this.__emitChange();
      break;
    case SessionConstants.REMOVE_USER_FROM_LIKES:
      var removalIndex = _current_user.likees.indexOf(payload.otherUser);
      var mutualRemovalIndex = _current_user.mutual_likes.indexOf(payload.otherUser);
      _current_user.likees.splice(removalIndex, 1);
      _current_user.mutual_likes.splice(mutualRemovalIndex, 1);
      this.__emitChange();
      break;
    case SessionConstants.ADD_NEW_ANSWER_TO_USER:
      _current_user.answers.push(payload.answer);
      this.__emitChange();
      break;
    case SessionConstants.ALL_ANSWERS:
      _current_user.answers = payload.answers;
      this.__emitChange();
      break;
    case SessionConstants.BIRTHDAY:
      _birthday = payload.birth_date;
      this.__emitChange();
      break;
  }
};

module.exports = SessionStore;
