var SessionActions = require('./../actions/sessionActions');
var ServerActions = require('./../actions/serverActions');

var UsersApiUtil = {
  signup: function (user, callback) {
    $.ajax({
      url: '/api/user',
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
        console.log('UserApiUtil#createAccount error');
        var errors = xhr.responseJSON;
        ErrorActions.setErrors("signup", errors);
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
      }
      // error: function (xhr) {
      //   debugger;
      //   console.log('UserApiUtil#createAccount error');
      //   var errors = xhr.responseJSON;
      //   ErrorActions.setErrors("signup", errors);
      // }
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
      }
      // error: function (xhr) {
      //   debugger;
      //   // console.log('UserApiUtil#createAccount error');
      //   // var errors = xhr.responseJSON;
      //   // ErrorActions.setErrors("signup", errors);
      // }
    });
  },

  updateUser: function (user) {
    $.ajax({
      url: '/api/user',
      type: 'PATCH',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ user: user }),
      success: function (user) {
        debugger;
        ServerActions.receiveCurrentUser(user);
      },
      error: function (xhr) {
        debugger;
        console.log('UserApiUtil#updateUser error');
        var errors = xhr.responseJSON;
        ErrorActions.setErrors("updateUser", errors);
      }
    });
  },

  getCurrentUserAbout: function () {
    $.ajax({
      url: '/api/user/about',
      type: 'GET',
      dataType: 'json',
      success: function (userAbout) {
        ServerActions.receiveCurrentUserAbout(userAbout);
      }
      // error: function (xhr) {
      //   debugger;
      //   // console.log('UserApiUtil#createAccount error');
      //   // var errors = xhr.responseJSON;
      //   // ErrorActions.setErrors("signup", errors);
      // }
    });
  },

  getOtherUserAbout: function (username) {
    $.ajax({
      url: '/api/users/' + username + '/about',
      type: 'GET',
      dataType: 'json',
      success: function (userAbout) {
        ServerActions.receiveOtherUserAbout(userAbout);
      }
      // error: function (xhr) {
      //   debugger;
      //   // console.log('UserApiUtil#createAccount error');
      //   // var errors = xhr.responseJSON;
      //   // ErrorActions.setErrors("signup", errors);
      // }
    });
  },

  updateCurrentUserAbout: function (aboutData) {
    $.ajax({
      url: '/api/user/about',
      type: 'PATCH',
      dataType: 'json',
      data: { about: aboutData },
      success: function (userAbout) {
        ServerActions.receiveCurrentUserAbout(userAbout);
      }
      // error: function (xhr) {
      //   debugger;
      //   // console.log('UserApiUtil#createAccount error');
      //   // var errors = xhr.responseJSON;
      //   // ErrorActions.setErrors("signup", errors);
      // }
    });
  },

  likeUser: function (otherUser, callback) {
    $.ajax({
      url: '/api/likes/',
      type: 'POST',
      dataType: 'json',
      data: { username: otherUser.username },
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
      url: '/api/likes/' + otherUser.username,
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


//// IN PROGRESS

  answerQuestion: function (answer, callback) {
    if (answer.importance === 'very') {
      answer.importance = 100;
    } else if (answer.importance === 'moderate') {
      answer.importance = 50;
    } if (answer.importance === 'not-very') {
      answer.importance = 10;
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
  },

  getAllAnswers: function () {
    $.ajax({
      url: '/api/user/answers/',
      type: 'GET',
      dataType: 'json',
      success: function (answers) {
        ServerActions.receiveAllAnswers(answers);
      },
      error: function (xhr) {
        debugger;
        // console.log('UserApiUtil#createAccount error');
        // var errors = xhr.responseJSON;
        // ErrorActions.setErrors("signup", errors);
      }
    });
  },

  getBirthday: function () {
    $.ajax({
      url: 'api/user/birthdate',
      method: 'GET',
      success: function (birth_date) {
        ServerActions.receiveBirthday(birth_date);
      }
    });
  }
};

module.exports = UsersApiUtil;
