var SessionApiUtil = require('../util/sessionApiUtil');
// var UsersApiUtil = require('../util/usersApiUtil');

var ClientActions = {
  loginWithUsername: function (user, callback) {
    SessionApiUtil.loginWithUsername(user, callback);
  },

  loginWithEmail: function (user, callback) {
    SessionApiUtil.loginWithEmail(user, callback);
  },

  logout: function (callback) {
    SessionApiUtil.logout(callback);
  }

  // signup: function (user, callback) {
  //   UserApiUtil.signup(user, callback);
  // },
};

module.exports = ClientActions;
