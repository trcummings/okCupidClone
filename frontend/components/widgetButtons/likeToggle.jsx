var React = require('react');
var PropTypes = React.PropTypes;

var LikeToggle = React.createClass({

  render: function () {
    return (
      <button id='like-toggle'>
        Like
      </button>
    );
  }

});

module.exports = LikeToggle;
