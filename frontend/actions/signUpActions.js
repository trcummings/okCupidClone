var AppDispatcher = require('../dispatcher/dispatcher');
var AuthInfoConstants = require('../constants/authInfoConstants');

var SignUpActions = {
  receiveLocationByZip: function (locationData) {
    locationData = JSON.parse(locationData);

    AppDispatcher.dispatch({
      actionType: AuthInfoConstants.ADD_ZIP,
      locationData: locationData
    });
  },

  incrementAuthState: function () {
    AppDispatcher.dispatch({
      actionType: AuthInfoConstants.NEXT_AUTH_STATE
    });
  }
};

module.exports = SignUpActions;
