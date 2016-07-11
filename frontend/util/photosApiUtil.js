var ServerActions = require('../actions/serverActions'),
    ErrorActions = require('../actions/errorActions');

var PhotosApiUtil = {
  uploadImage: function (photo) {
    $.ajax({
      url: '/api/user/photos',
      method: 'POST',
      dataType: 'json',
      data: {
        user_photo: {
          photo_url: photo.url,
          public_id: photo.public_id
        }
      },
      success: function (image) {
        ServerActions.receiveUploadedPhoto(image);
      },
      error: function (xhr) {
        var errors = xhr.responseJSON;
	      ErrorActions.setErrors("photo_upload", errors);
      }
    });
  },

  getCurrentUserPhotos: function () {
    $.ajax({
      url: '/api/user/photos',
      method: 'GET',
      dataType: 'json',
      success: function (images) {
        ServerActions.receiveCurrentUserPhotos(images);
      },
      error: function (xhr) {
        var errors = xhr.responseJSON;
	      ErrorActions.setErrors("photo_get", errors);
      }
    });
  },

  getOtherUserPics: function (username) {
    $.ajax({
      url: '/api/users/' + username + '/photos',
      method: 'GET',
      dataType: 'json',
      success: function (images) {
        ServerActions.receiveOtherUserPics(images);
      },
      error: function (xhr) {
        var errors = xhr.responseJSON;
        ErrorActions.setErrors("photo_get", errors);
      }
    });
  }
};

module.exports = PhotosApiUtil;
