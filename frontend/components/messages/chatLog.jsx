var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = React.PropTypes;
var SessionStore = require('../../stores/sessionStore');

var ChatLog = React.createClass({
  componentWillUpdate: function() {
    var node = ReactDOM.findDOMNode(this);
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  },

  componentDidUpdate: function() {
    if (this.shouldScrollBottom) {
      var node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  },

  render: function() {
    var result = [];

    this.props.messages.forEach(function (message, index) {
      if (index === this.props.messages.length) {
        ReactDOM.findDOMNode(this).scrollTop = 0;
      }
      if (message.sender === SessionStore.currentUser().username) {
        result.push(
          <li
            key={index}
            className='msg-item'
          >
            <p className='current-user-message'>
              {message.content}
            </p>
          </li>
        );
      } else {
        result.push(
          <li
            key={index}
            className='msg-item'
          >
            <p className='other-user-message'>
              {message.content}
            </p>
          </li>
        );
      }
    }.bind(this));

    return (
      <ul className='chatlog-box'>
        {result}
      </ul>
    );
  }

});

module.exports = ChatLog;
