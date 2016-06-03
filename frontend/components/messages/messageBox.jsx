var React = require('react');
var PropTypes = React.PropTypes;
var MessageStore = require('../../stores/messageStore');
var SessionStore = require('../../stores/sessionStore');
// should have the other user passed in as a prop
// this.props.otheruser
//channel is going to be what the two users get on to

var MessageBox = React.createClass({
  componentDidMount: function () {
    this.chatListener = MessageStore.addListener(function () {

    }.bind(this));

    var pusher = new Pusher('3d1017ad258d309a7dff', {
      encrypted: true
    });

    var channel = pusher.subscribe('chhhannnelell');
    channel.bind('my_event', function(data) {
      // push message data to store
      // callback;
    });
  },

  buildChatLog: function () {
    var messageHistory = MessageStore.returnChatlog(this.props.receiver),
        currentUser = SessionStore.currentUser();

    messageHistory.map(function (message, index) {
      if (message.sender_id === currentUser.id) {
        return (
          <li id='current-user-message'>message.content</li>
        );
      } else {
        return (
          <li id='other-user-message'>message.content</li>
        );
      }
    });
  },

  render: function () {
    return (
      <div id='chat-window'>
        <ul id='chatlog-box'>
          {this.buildChatLog()}
        </ul>
        <input
          type='text'
          className='new-message-box'
        />
      <button id='send-message-button'> Send </button>
      </div>
    );
  }

});

module.exports = MessageBox;
