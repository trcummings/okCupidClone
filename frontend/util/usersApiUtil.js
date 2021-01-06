var SessionActions = require("./../actions/sessionActions");
var ServerActions = require("./../actions/serverActions");

var UsersApiUtil = {
  signup: function (user, callback) {
    $.ajax({
      url: "/api/user",
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ user: user }),
      success: function (currentUser) {
        SessionActions.receiveCurrentUser(currentUser);
        callback();
      },
      error: function (xhr) {
        console.log("UserApiUtil#createAccount error");
        var errors = xhr.responseJSON;
        ErrorActions.setErrors("signup", errors);
      },
    });
  },

  fetchAllPossibleMatches: function () {
    $.ajax({
      url: "/api/users",
      type: "GET",
      dataType: "json",
      success: function (users) {
        ServerActions.receiveAllPossibleMatches(users);
      },
    });
  },

  fetchSingleUser: function (username) {
    $.ajax({
      url: "/api/users/" + username,
      type: "GET",
      dataType: "json",
      success: function (user) {
        ServerActions.receiveSingleUser(user);
      },
    });
  },

  updateUser: function (user, callback) {
    $.ajax({
      url: "/api/user",
      type: "PATCH",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ user: user }),
      success: function (user) {
        SessionActions.receiveCurrentUser(user);
        callback();
      },
      error: function (xhr) {
        var errors = xhr.responseJSON;
        ErrorActions.setErrors("updateUser", errors);
      },
    });
  },

  getCurrentUserAbout: function () {
    $.ajax({
      url: "/api/user/about",
      type: "GET",
      dataType: "json",
      success: function (userAbout) {
        ServerActions.receiveCurrentUserAbout(userAbout);
      },
    });
  },

  getOtherUserAbout: function (username) {
    $.ajax({
      url: "/api/users/" + username + "/about",
      type: "GET",
      dataType: "json",
      success: function (userAbout) {
        ServerActions.receiveOtherUserAbout(userAbout);
      },
    });
  },

  updateCurrentUserAbout: function (aboutData) {
    $.ajax({
      url: "/api/user/about",
      type: "PATCH",
      dataType: "json",
      data: { about: aboutData },
      success: function (userAbout) {
        ServerActions.receiveCurrentUserAbout(userAbout);
      },
    });
  },

  likeUser: function (otherUser, callback) {
    $.ajax({
      url: "/api/likes/",
      type: "POST",
      dataType: "json",
      data: { username: otherUser.username },
      success: function (like) {
        ServerActions.addUserToLikes(otherUser);
        callback();
      },
    });
  },

  unlikeUser: function (otherUser, callback) {
    $.ajax({
      url: "/api/likes/" + otherUser.username,
      type: "DELETE",
      dataType: "json",
      success: function (like) {
        ServerActions.removeUserFromLikes(otherUser);
        callback();
      },
    });
  },

  //// IN PROGRESS

  answerQuestion: function (answer, callback) {
    if (answer.importance === "very") {
      answer.importance = 100;
    } else if (answer.importance === "moderate") {
      answer.importance = 50;
    }
    if (answer.importance === "not-very") {
      answer.importance = 10;
    }
    if (answer.importance === "irrelevant") {
      answer.importance = 0;
    }

    $.ajax({
      url: "/api/answers/",
      type: "POST",
      dataType: "json",
      data: { answer: answer },
      success: function (answer) {
        ServerActions.answerQuestion(answer);
        callback();
      },
      error: function (xhr) {
        console.log("UserApiUtil#answerQuestion error");
        var errors = xhr.responseJSON;
        ErrorActions.setErrors("answer", errors);
      },
    });
  },

  getAllAnswers: function () {
    $.ajax({
      url: "/api/user/answers/",
      type: "GET",
      dataType: "json",
      success: function (answers) {
        ServerActions.receiveAllAnswers(answers);
      },
      error: function (xhr) {
        console.log("UserApiUtil#getAllAnswers error");
        var errors = xhr.responseJSON;
        ErrorActions.setErrors("answer", errors);
      },
    });
  },

  updateAnswer: function (answer, callback) {
    if (answer.importance === "very") {
      answer.importance = 100;
    } else if (answer.importance === "moderate") {
      answer.importance = 50;
    }
    if (answer.importance === "not-very") {
      answer.importance = 10;
    }
    if (answer.importance === "irrelevant") {
      answer.importance = 0;
    }

    $.ajax({
      url: "/api/answers/" + answer.question_id,
      type: "PATCH",
      dataType: "json",
      data: { answer: answer },
      success: function (answer) {
        ServerActions.updateAnswer(answer);
        callback();
      },
      error: function (xhr) {
        console.log("UserApiUtil#updateAnswer error");
        var errors = xhr.responseJSON;
        ErrorActions.setErrors("answer", errors);
      },
    });
  },

  getBirthday: function () {
    $.ajax({
      url: "api/user/birthdate",
      method: "GET",
      success: function (birth_date) {
        ServerActions.receiveBirthday(birth_date);
      },
    });
  },
};

export default UsersApiUtil;
