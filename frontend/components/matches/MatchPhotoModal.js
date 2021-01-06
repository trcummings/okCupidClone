import React from "react";
import createClass from "create-react-class";

var MatchPhotoModal = createClass({
  getInitialState: function () {
    return {
      selected: 0,
    };
  },

  leftClick: function (event) {
    event.preventDefault();

    if (this.props.photos.length === this.state.selected + 1) {
      this.setState({ selected: 0 });
    } else {
      this.setState({ selected: this.state.selected + 1 });
    }
  },

  rightClick: function (event) {
    event.preventDefault();

    if (this.state.selected === 0) {
      this.setState({ selected: this.props.photos.length - 1 });
    } else {
      this.setState({ selected: this.state.selected - 1 });
    }
  },

  renderCarousel: function () {
    var isVisible,
      selectedIndex = this.state.selected;

    return this.props.photos.map(function (photo, index) {
      if (index === selectedIndex) {
        return (
          <li key={index}>
            <img src={photo.photo_url} />
            <p className="description-text">{photo.description}</p>
          </li>
        );
      }
    });
  },

  render: function () {
    return (
      <section id="pictures-modal" className="group">
        <ul>{this.renderCarousel()}</ul>
        <div className="group">
          <button className="left" onClick={this.leftClick}>
            <i className="fa fa-angle-left" aria-hidden="true"></i>
          </button>
          <button className="right" onClick={this.rightClick}>
            <i className="fa fa-angle-right" aria-hidden="true"></i>
          </button>
        </div>
      </section>
    );
  },
});

export default MatchPhotoModal;
