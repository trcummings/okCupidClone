var SessionActions = require('./../actions/sessionActions');
var ServerActions = require('./../actions/serverActions');

var UsersApiUtil = {
  signup: function (user, callback) {
    $.ajax({
      url: '/api/users',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ user: user }),
      success: function (currentUser) {
        SessionActions.receiveCurrentUser(currentUser);
        callback();
      },
      error: function (xhr) {
        debugger;
        // console.log('UserApiUtil#createAccount error');
        // var errors = xhr.responseJSON;
        // ErrorActions.setErrors("signup", errors);
      }
    });
  },

  fetchAllPossibleMatches: function () {
    $.ajax({
      url: '/api/users',
      type: 'GET',
      dataType: 'json',
      success: function (users) {
        ServerActions.receiveAllPossibleMatches(users);
      },
      error: function (xhr) {
        debugger;
        // console.log('UserApiUtil#createAccount error');
        // var errors = xhr.responseJSON;
        // ErrorActions.setErrors("signup", errors);
      }
    });
  },

  fetchSingleUser: function (username) {
    $.ajax({
      url: '/api/users/' + username,
      type: 'GET',
      dataType: 'json',
      success: function (user) {
        // debugger;
        ServerActions.receiveSingleUser(user);
      },
      error: function (xhr) {
        debugger;
        // console.log('UserApiUtil#createAccount error');
        // var errors = xhr.responseJSON;
        // ErrorActions.setErrors("signup", errors);
      }
    });
  },

  updateUser: function (user) {
    $.ajax({
      url: '/api/users/' + id,
      type: 'PATCH',
      dataType: 'json',
      success: function (user) {
        ServerActions.receiveSingleUser(user);
      },
      error: function (xhr) {
        debugger;
        // console.log('UserApiUtil#createAccount error');
        // var errors = xhr.responseJSON;
        // ErrorActions.setErrors("signup", errors);
      }
    });
  },

  getCurrentUserAbout: function (currentUser) {
    $.ajax({
      url: '/api/user_abouts/' + currentUser.id,
      type: 'GET',
      dataType: 'json',
      success: function (userAbout) {
        ServerActions.receiveCurrentUserAbout(userAbout);
      },
      error: function (xhr) {
        debugger;
        // console.log('UserApiUtil#createAccount error');
        // var errors = xhr.responseJSON;
        // ErrorActions.setErrors("signup", errors);
      }
    });
  },

  updateCurrentUserAbout: function (currentUser, aboutData) {
    $.ajax({
      url: '/api/user_abouts/' + currentUser.id,
      type: 'PATCH',
      dataType: 'json',
      data: { about: aboutData },
      success: function (userAbout) {
        ServerActions.receiveCurrentUserAbout(userAbout);
      },
      error: function (xhr) {
        debugger;
        // console.log('UserApiUtil#createAccount error');
        // var errors = xhr.responseJSON;
        // ErrorActions.setErrors("signup", errors);
      }
    });
  }
};

module.exports = UsersApiUtil;
