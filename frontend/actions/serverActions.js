var UserConstants = require('../constants/userConstants');
var AppDispatcher = require('../dispatcher/dispatcher');
var PhotoConstants = require('../constants/photoConstants');

var ServerActions = {
  receiveAllPossibleMatches: function (users) {
    AppDispatcher.dispatch({
      actionType: UserConstants.GET_ALL_POSSIBLE_MATCHES,
      users: users
    });
  },

  receiveUploadedPhoto: function (image) {
    AppDispatcher.dispatch({
      actionType: PhotoConstants.NEW_PHOTO,
      image: image
    });
  },

  receiveCurrentUserPhotos: function (images) {
    AppDispatcher.dispatch({
      actionType: PhotoConstants.CURRENT_USER_PHOTOS,
      images: images
    });
  }
};

module.exports = ServerActions;
