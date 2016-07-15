var React = require('react');
var PropTypes = React.PropTypes;
var PhotoStore = require('../../stores/photoStore');
var PhotoDescription = require('./photoDescription');

var ProfilePicturesTab = React.createClass({
  getInitialState: function () {
    return ({
      photos: PhotoStore.returnCurrentUserPhotos()
    });
  },

  componentDidMount: function () {
    this.photoListener = PhotoStore.addListener(function () {
      this.setState({ userPhotos: PhotoStore.returnCurrentUserPhotos() });
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.photoListener.remove();
  },

  renderPhotos: function () {
    return this.state.photos.map(function (photo, index) {
      return (
        <li key={index}>
          <img src={photo.photo_url} />
          <PhotoDescription photo={photo} />
        </li>
      );
    });
  },

  render: function () {
    return (
      <div id='pictures-tab'>
        <ul>
          {this.renderPhotos()}
        </ul>
      </div>
    );
  }

});

module.exports = ProfilePicturesTab;
