var React = require('react');
var PropTypes = React.PropTypes;

var MessageButton = React.createClass({
  handleOpenMessage: function (event) {
    event.preventDefault();

    alert("doesn't do anything yet!");
  },

  render: function() {
    return (
      <button
        id='message-button'
        onClick={this.handleOpenMessage}
      >
        Message
      </button>
    );
  }

});

module.exports = MessageButton;
