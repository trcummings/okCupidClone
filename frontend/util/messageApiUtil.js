var ServerActions = require('./../actions/serverActions');

var UsersApiUtil = {
  signup: function () {
    $.ajax({
      url: '/api/messages',
      type: 'POST',
      dataType: 'json',
      data: {
        message: {
          content: 'slammyhammy',
          sender_id: 'bbgbbg',
          receiver_id: 'gghhhghhg'
        }
      },
      success: function (currentUser) {
        SessionActions.receiveCurrentUser(currentUser);
        callback();
      },
      error: function (xhr) {
        // console.log('UserApiUtil#createAccount error');
        // var errors = xhr.responseJSON;
        // ErrorActions.setErrors("signup", errors);
      }
    });
  },
};

module.exports = UsersApiUtil;
