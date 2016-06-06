var UserConstants = require('../constants/userConstants');
var AppDispatcher = require('../dispatcher/dispatcher');
var PhotoConstants = require('../constants/photoConstants');
var AboutConstants = require('../constants/aboutConstants');

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
  },

  receiveSingleUser: function (user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_SINGLE_USER,
      user: user
    });
  },

  receiveOtherUserPics: function (images) {
    AppDispatcher.dispatch({
      actionType: PhotoConstants.OTHER_USER_PHOTOS,
      images: images
    });
  },

  receiveCurrentUserAbout: function (userAbout) {
    AppDispatcher.dispatch({
      actionType: AboutConstants.CURRENT_USER_ABOUT,
      userAbout: userAbout
    });
  }
};

module.exports = ServerActions;
