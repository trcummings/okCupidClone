import { Store } from "flux/utils";

import AppDispatcher from "../dispatcher/dispatcher";

var SessionConstants = require("../constants/sessionConstants");

var _current_user = {};
var _birthday = "";
var _currentUserHasBeenFetched = false;

var SessionStore = new Store(AppDispatcher);

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

SessionStore.removeFromLikes = function (user) {
  for (var i = 0; i < _current_user.mutual_likes.length; i++) {
    if (_current_user.mutual_likes[i].username === user.username) {
      _current_user.mutual_likes.splice(i, 1);
    }
  }

  for (var j = 0; j < _current_user.likees.length; j++) {
    if (_current_user.likees[j].username === user.username) {
      _current_user.likees.splice(j, 1);
    }
  }
};

SessionStore.addToLikes = function (otherUser) {
  var existsInLikees = false;
  var existsInOtherUserLikees = false;
  _current_user.likees.forEach(function (user, index) {
    if (user.username === otherUser.username) {
      existsInLikees = true;
    }
  });

  if (!existsInLikees) {
    _current_user.likees.push(otherUser);
  }

  _current_user.likers.forEach(function (user, index) {
    if (user.username === otherUser.username) {
      existsInOtherUserLikees = true;
    }
  });

  if (existsInOtherUserLikees) {
    _current_user.mutual_likes.push(otherUser);
  }
};

SessionStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
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
      this.addToLikes(payload.otherUser);
      this.__emitChange();
      break;
    case SessionConstants.REMOVE_USER_FROM_LIKES:
      this.removeFromLikes(payload.otherUser);
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
    case SessionConstants.UPDATE_ANSWER:
      _current_user.answers.forEach(function (answer, index) {
        if (answer.content === payload.answer.content) {
          _current_user.answers[index] = payload.answer;
        }
      });
      this.__emitChange();
      break;
    case SessionConstants.BIRTHDAY:
      _birthday = payload.birth_date;
      this.__emitChange();
      break;
  }
};

export default SessionStore;
