var ServerActions = require('../actions/serverActions'),
    ErrorActions = require('../actions/errorActions');

var PhotosApiUtil = {
  uploadImage: function (photo_url) {
    $.ajax({
      url: '/api/user_photos',
      method: 'POST',
      dataType: 'json',
      data: {
        user_photo: {
          photo_url: photo_url
        }
      },
      success: function (image) {
        ServerActions.receiveUploadedPhoto(image);
      },
      error: function (xhr) {
        console.log("Photo error in PhotosApiUtil#uploadImage");
        var errors = xhr.responseJSON;
	      ErrorActions.setErrors("photo_upload", errors);
      }
    });
  },

  getCurrentUserPhotos: function () {
    $.ajax({
      url: '/api/user_photos',
      method: 'GET',
      dataType: 'json',
      success: function (images) {
        ServerActions.receiveCurrentUserPhotos(images);
      },
      error: function (xhr) {
        console.log("Photo error in PhotosApiUtil#getCurrentUserPhotos");
        var errors = xhr.responseJSON;
	      ErrorActions.setErrors("photo_get", errors);
      }
    });
  }
};

module.exports = PhotosApiUtil;
