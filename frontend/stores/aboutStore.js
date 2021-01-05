var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AboutConstants = require("../constants/aboutConstants");
// var SessionStore = require('./sessionStore');

var _currentUserAbout = {};
var AboutStore = new Store(AppDispatcher);

AboutStore.currentUserAbout = function () {
  return _currentUserAbout;
};

AboutStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case AboutConstants.CURRENT_USER_ABOUT:
      _currentUserAbout = payload.userAbout;
      this.__emitChange();
      break;
  }
};

module.exports = AboutStore;
