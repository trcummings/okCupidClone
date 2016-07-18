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

  removePhoto: function (photo, event) {
    event.preventDefault();

    alert('tried to delete photo');
  },

  makePhotoDefault: function (photo, event) {
    event.preventDefault();

    alert('tried to default photo');
  },

  renderPhotos: function () {
    return this.state.photos.map(function (photo, index) {
      return (
        <li key={index}>
          <img src={photo.photo_url} />
          <button className='photo-delete' onClick={this.removePhoto.bind(this, photo)}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
          <button className='photo-default' onClick={this.makePhotoDefault.bind(this, photo)}>Make Default</button>
          <PhotoDescription photo={photo} />
        </li>
      );
    }.bind(this));
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
