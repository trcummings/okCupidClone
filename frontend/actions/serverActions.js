var UserConstants = require('../constants/userConstants');
var AppDispatcher = require('../dispatcher/dispatcher');
var PhotoConstants = require('../constants/photoConstants');
var AboutConstants = require('../constants/aboutConstants');
var SessionConstants = require('../constants/sessionConstants');

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
  },

  receiveOtherUserAbout: function (userAbout) {
    AppDispatcher.dispatch({
      actionType: UserConstants.RECEIVE_OTHER_USER_ABOUT,
      userAbout: userAbout
    });
  },

  addUserToLikes: function (otherUser) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.ADD_USER_TO_LIKES,
      otherUser: otherUser
    });
  },


  removeUserFromLikes: function (otherUser) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.REMOVE_USER_FROM_LIKES,
      otherUser: otherUser
    });
  },

  answerQuestion: function (answer) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.ADD_NEW_ANSWER_TO_USER,
      answer: answer
    });
  },

  receiveAllAnswers: function (answers) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.ALL_ANSWERS,
      answers: answers
    });
  },

  receiveBirthday: function (birth_date) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.BIRTHDAY,
      birth_date: birth_date
    });
  }
};

module.exports = ServerActions;
