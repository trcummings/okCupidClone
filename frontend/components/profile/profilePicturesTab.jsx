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
