var UserConstants = require('../constants/userConstants');
var AppDispatcher = require('../dispatcher/dispatcher');

var ServerActions = {
  receiveAllPossibleMatches: function (users) {
    AppDispatcher.dispatch({
      actionType: UserConstants.GET_ALL_POSSIBLE_MATCHES,
      users: users
    });
  }
};

module.exports = ServerActions;
