var SessionActions = require('../actions/sessionActions');

var SessionApiUtil = {
  loginWithEmail: function (user, callback) {
    $.ajax({
      url: '/api/session',
      method: 'POST',
      dataType: 'json',
      data: {
        email: user.email,
        password: user.password
      },
      success: function (currentUser) {
        SessionActions.receiveCurrentUser(currentUser);
        callback();
      },
      error: function (errors) {
        // errors = errors.responseJSON.base;
        // ErrorActions.setErrors(errors);
      }
    });
  },

  loginWithUsername: function (user, callback) {
    $.ajax({
      url: '/api/session',
      method: 'POST',
      dataType: 'json',
      data: {
        username: user.username,
        password: user.password
      },
      success: function (currentUser) {
        SessionActions.receiveCurrentUser(currentUser);
        callback();
      },
      error: function (errors) {
        // errors = errors.responseJSON.base;
        // ErrorActions.setErrors(errors);
      }
    });
  },

  logout: function (callback) {
    $.ajax({
      url: '/api/session',
      method: 'DELETE',
      dataType: 'json',
      success: function () {
        SessionActions.removeCurrentUser();
        callback();
      },
      error: function () {
        console.log("somethin wrong");
      }
    });
  },

  fetchCurrentUser: function () {
    $.ajax({
      url: '/api/session',
      method: 'GET',
      dataType: 'json',
      success: function (currentUser) {
        SessionActions.receiveCurrentUser(currentUser);
      },
      error: function () {
        console.log("somethin wrong");
      }
    });
  }
};

module.exports = SessionApiUtil;
