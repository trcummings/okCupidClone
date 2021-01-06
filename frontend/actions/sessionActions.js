var SessionConstants = require("../constants/sessionConstants");
var SessionApiUtil = require("../util/sessionApiUtil");
var SessionStore = require("../stores/sessionStore");
var AppDispatcher = require("../dispatcher/dispatcher");

var SessionActions = {
  receiveCurrentUser: function (currentUser) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOG_IN,
      currentUser: currentUser,
    });
  },

  removeCurrentUser: function () {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOG_OUT,
    });
  },
};

export default SessionActions;
