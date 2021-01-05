var ServerActions = require("../actions/serverActions"),
  ErrorActions = require("../actions/errorActions");

var PhotosApiUtil = {
  uploadImage: function (photo) {
    $.ajax({
      url: "/api/user/photos",
      method: "POST",
      processData: false,
      contentType: false,
      dataType: "json",
      data: photo,
      success: function (image) {
        ServerActions.receiveUploadedPhoto(image);
      },
      error: function (xhr) {
        var errors = xhr.responseJSON;
        ErrorActions.setErrors("photo_upload", errors);
      },
    });
  },

  defaultPhoto: function (photo) {
    $.ajax({
      url: "/api/user/photos/" + photo.photo_id,
      method: "GET",
      dataType: "json",
      data: photo,
      success: function (image_id) {
        ServerActions.receiveDefaultedPhotoId(image_id);
      },
      error: function (xhr) {
        var errors = xhr.responseJSON;
        ErrorActions.setErrors("photo_default", errors);
      },
    });
  },

  updatePhotoDescription: function (options) {
    $.ajax({
      url: "/api/user/photos",
      method: "PATCH",
      dataType: "json",
      data: {
        photo: {
          photo_id: options.photo.photo_id,
          description: options.newDescription,
        },
      },
      success: function (image) {
        ServerActions.receiveUpdatedPhotoDescription(image);
      },
      error: function (xhr) {
        var errors = xhr.responseJSON;
        ErrorActions.setErrors("photo_update", errors);
      },
    });
  },

  getCurrentUserPhotos: function () {
    $.ajax({
      url: "/api/user/photos",
      method: "GET",
      dataType: "json",
      success: function (images) {
        ServerActions.receiveCurrentUserPhotos(images);
      },
      error: function (xhr) {
        var errors = xhr.responseJSON;
        ErrorActions.setErrors("photo_get", errors);
      },
    });
  },

  getOtherUserPics: function (username) {
    $.ajax({
      url: "/api/users/" + username + "/photos",
      method: "GET",
      dataType: "json",
      success: function (images) {
        ServerActions.receiveOtherUserPics(images);
      },
      error: function (xhr) {
        var errors = xhr.responseJSON;
        ErrorActions.setErrors("photo_get", errors);
      },
    });
  },

  deletePhoto: function (photo) {
    $.ajax({
      url: "/api/user/photos/" + photo.photo_id,
      method: "DELETE",
      dataType: "json",
      success: function (image) {
        ServerActions.receiveRemovedPhoto(image);
      },
      error: function (xhr) {
        var errors = xhr.responseJSON;
        ErrorActions.setErrors("photo_delete", errors);
      },
    });
  },
};

module.exports = PhotosApiUtil;
