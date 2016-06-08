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
  },

  likeUser: function (otherUser, callback) {

    $.ajax({
      url: '/api/likes/',
      type: 'POST',
      dataType: 'json',
      data: { user_id: otherUser.id },
      success: function (like) {
        ServerActions.addUserToLikes(otherUser);
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

  unlikeUser: function (otherUser, callback) {

    $.ajax({
      url: '/api/likes/' + otherUser.id,
      type: 'DELETE',
      dataType: 'json',
      success: function (like) {
        ServerActions.removeUserFromLikes(otherUser);
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

  answerQuestion: function (answer, callback) {
    if (answer.importance === 'very') {
      answer.importance = 250;
    } else if (answer.importance === 'moderate') {
      answer.importance = 10;
    } if (answer.importance === 'not-very') {
      answer.importance = 1;
    } if (answer.importance === 'irrelevant') {
      answer.importance = 0;
    }

    $.ajax({
      url: '/api/answers/',
      type: 'POST',
      dataType: 'json',
      data: { answer: answer },
      success: function (answer) {
        ServerActions.answerQuestion(answer);
        callback();
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
