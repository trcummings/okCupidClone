var SessionActions = require('./../actions/sessionActions');
var ServerActions = require('./../actions/serverActions');

var UsersApiUtil = {
  signup: function (user, callback) {
    user.birth_date = JSON.stringify(user.birth_date);
    $.ajax({
      url: '/api/users',
      type: 'POST',
      dataType: 'json',
      data: { user: user },
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
  }
};

module.exports = UsersApiUtil;
