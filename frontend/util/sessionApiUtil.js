var SessionActions = require('../actions/sessionActions'),
    ErrorActions = require('../actions/errorActions');

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
      error: function (xhr) {
        console.log("Login error in SessionApiUtil#loginWithEmail");
        var errors = xhr.responseJSON;
	      ErrorActions.setErrors("login", errors);
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
      error: function (xhr) {
        console.log("Login error in SessionApiUtil#loginWithUsername");
        var errors = xhr.responseJSON;
	      ErrorActions.setErrors("login", errors);
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
      error: function (xhr) {
			  console.log("Error in SessionApiUtil#logout");
			},
    });
  },

  fetchCurrentUser: function (callback) {
    $.ajax({
      url: '/api/session',
      method: 'GET',
      dataType: 'json',
      success: function (currentUser) {
        SessionActions.receiveCurrentUser(currentUser);
      },
      error: function () {
  			console.log("Logout error in SessionApiUtil#fetchCurrentUser");
  		},
      complete: function () {
        callback && callback();
      }
    });
  }
};

module.exports = SessionApiUtil;
