var SessionApiUtil = require('../util/sessionApiUtil');
var UserAuthApiUtil = require('../util/userAuthApiUtil');
var UsersApiUtil = require('../util/usersApiUtil');
var PhotosApiUtil = require('../util/photosApiUtil');
var MessageApiUtil = require('../util/messageApiUtil');

var ClientActions = {
  //////AUTH

  loginWithUsername: function (user, callback) {
    SessionApiUtil.loginWithUsername(user, callback);
  },

  loginWithEmail: function (user, callback) {
    SessionApiUtil.loginWithEmail(user, callback);
  },

  logout: function (callback) {
    SessionApiUtil.logout(callback);
  },

  lookUpZipCode: function (zipCode) {
    UserAuthApiUtil.getLocationByZip(zipCode);
  },

  lookUpZipCodeForModal: function (zipCode, callback) {
    UserAuthApiUtil.getLocationByZipForModal(zipCode, callback);
  },

  incrementAuthState: function () {
    UserAuthApiUtil.incrementAuthState();
  },

  // in usersApiUtil but that's weird
  signup: function (user, callback) {
    UsersApiUtil.signup(user, callback);
  },


  ///// usersApiUtil

  fetchAllPossibleMatches: function () {
    UsersApiUtil.fetchAllPossibleMatches();
  },

  fetchSingleUser: function (username) {
    UsersApiUtil.fetchSingleUser(username);
  },

  updateUser: function (user, callback) {
    UsersApiUtil.updateUser(user, callback);
  },

  getCurrentUserAbout: function () {
    UsersApiUtil.getCurrentUserAbout();
  },

  getBirthday: function () {
    UsersApiUtil.getBirthday();
  },

  updateCurrentUserAbout: function (aboutData) {
    UsersApiUtil.updateCurrentUserAbout(aboutData);
  },

  getOtherUserAbout: function (username) {
    UsersApiUtil.getOtherUserAbout(username);
  },

  likeUser: function (otherUser, callback) {
    UsersApiUtil.likeUser(otherUser, callback);
  },

  unlikeUser: function (otherUser, callback) {
    UsersApiUtil.unlikeUser(otherUser, callback);
  },

  ///unfinished

  answerQuestion: function (answer, callback) {
    UsersApiUtil.answerQuestion(answer, callback);
  },

  getAllAnswers: function () {
    UsersApiUtil.getAllAnswers();
  },

  updateAnswer: function (answer, callback) {
    UsersApiUtil.updateAnswer(answer, callback);
  },

  /// photosApiUtil

  uploadImage: function (photo) {
    PhotosApiUtil.uploadImage(photo);
  },

  getCurrentUserPhotos: function () {
    PhotosApiUtil.getCurrentUserPhotos();
  },


  getOtherUserPics: function (username) {
    PhotosApiUtil.getOtherUserPics(username);
  },


  /// some shit for messages idk

  createNewConversation: function (targetUser) {
    MessageApiUtil.createNewConversation(targetUser);
  },

  openConversation: function (targetUser) {
    MessageApiUtil.openConversation(targetUser);
  },

  sendMessage: function (message, receiver_id) {
    MessageApiUtil.sendMessage(message, receiver_id);
  },

};

module.exports = ClientActions;
