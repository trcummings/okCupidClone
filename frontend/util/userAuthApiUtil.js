var SignUpActions = require("../actions/signUpActions");

UserAuthApiUtil = {
  getLocationByZip: function (zipCode) {
    var client = new XMLHttpRequest();
    client.open("GET", "https://api.zippopotam.us/us/" + zipCode, true);
    client.onreadystatechange = function () {
      if (client.readyState == 4) {
        SignUpActions.receiveLocationByZip(client.responseText);
      }
    };

    client.send();
  },

  getLocationByZipForModal: function (zipCode, callback) {
    var client = new XMLHttpRequest();
    client.open("GET", "https://api.zippopotam.us/us/" + zipCode, true);
    client.onreadystatechange = function () {
      if (client.readyState == 4) {
        callback(client.responseText);
      }
    };

    client.send();
  },

  incrementAuthState: function () {
    SignUpActions.incrementAuthState();
  },

  checkForUniqueEmail: function (email) {
    $.ajax({
      url: "/api/users/emails/" + email,
      type: "GET",
      dataType: "json",
      contentType: "application/json",
      success: function (emailIsUnique) {
        SignUpActions.receiveEmailIsUnique(emailIsUnique);
      },
    });
  },

  checkForUniqueUsername: function (username, callback) {
    $.ajax({
      url: "/api/users/" + username + "/is_unique",
      type: "GET",
      dataType: "json",
      contentType: "application/json",
      success: function (result) {
        callback(result, username);
      },
    });
  },
};

module.exports = UserAuthApiUtil;
