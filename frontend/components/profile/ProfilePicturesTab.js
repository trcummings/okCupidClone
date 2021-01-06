import React from "react";
import createClass from "create-react-class";
import PropTypes from "prop-types";

import PhotoDescription from "./PhotoDescription";

import ClientActions from "../../actions/clientActions";
import PhotoStore from "../../stores/photoStore";

var ProfilePicturesTab = createClass({
  getInitialState: function () {
    return {
      photos: PhotoStore.returnCurrentUserPhotos(),
    };
  },

  componentDidMount: function () {
    this.photoListener = PhotoStore.addListener(
      function () {
        this.setState({ userPhotos: PhotoStore.returnCurrentUserPhotos() });
      }.bind(this)
    );
  },

  componentWillUnmount: function () {
    this.photoListener.remove();
  },

  removePhoto: function (photo, event) {
    event.preventDefault();

    ClientActions.deletePhoto(photo);
  },

  makePhotoDefault: function (photo, event) {
    event.preventDefault();

    ClientActions.defaultPhoto(photo);
  },

  renderPhotos: function () {
    return this.state.photos.map(
      function (photo, index) {
        return (
          <li key={index}>
            <img src={photo.photo_url} />
            <button
              className="photo-delete"
              onClick={this.removePhoto.bind(this, photo)}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
            <button
              className="photo-default"
              onClick={this.makePhotoDefault.bind(this, photo)}
            >
              Make Default
            </button>
            <PhotoDescription photo={photo} />
          </li>
        );
      }.bind(this)
    );
  },

  render: function () {
    return (
      <div id="pictures-tab">
        <ul>{this.renderPhotos()}</ul>
      </div>
    );
  },
});

export default ProfilePicturesTab;
