var SessionApiUtil = require('../util/sessionApiUtil');
var UserAuthApiUtil = require('../util/userAuthApiUtil');
var UsersApiUtil = require('../util/usersApiUtil');
var PhotosApiUtil = require('../util/photosApiUtil');

var ClientActions = {
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

  incrementAuthState: function () {
    UserAuthApiUtil.incrementAuthState();
  },

  signup: function (user, callback) {
    UsersApiUtil.signup(user, callback);
  },

  fetchAllPossibleMatches: function () {
    UsersApiUtil.fetchAllPossibleMatches();
  },

  uploadImage: function (photo_url) {
    PhotosApiUtil.uploadImage(photo_url);
  },

  getCurrentUserPhotos: function () {
    PhotosApiUtil.getCurrentUserPhotos();
  }
};

module.exports = ClientActions;
