var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var PhotoConstants = require('../constants/photoConstants');
// var SessionStore = require('./sessionStore');

var _currentUserPhotos = [];

var PhotoStore = new Store(AppDispatcher);

PhotoStore.returnCurrentUserPhotos = function () {
  return _currentUserPhotos;
};

PhotoStore.addPhotoToCurrentUserPhotos = function (image) {
  _currentUserPhotos.push(image);
};

PhotoStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case PhotoConstants.NEW_PHOTO:
      this.addPhotoCurrentToUserPhotos(payload.image);
      break;
    case PhotoConstants.CURRENT_USER_PHOTOS:
      _currentUserPhotos = payload.images;
      break;
    }
    this.__emitChange();
};

module.exports = PhotoStore;
