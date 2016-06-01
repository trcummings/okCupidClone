var SessionActions = require('./../actions/sessionActions');

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
        debugger;
        callback();
      },
      error: function (xhr) {
        // console.log('UserApiUtil#createAccount error');
        // var errors = xhr.responseJSON;
        // ErrorActions.setErrors("signup", errors);
      }
    });
  }
};

module.exports = UsersApiUtil;
