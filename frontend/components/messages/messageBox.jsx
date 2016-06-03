var React = require('react');
var PropTypes = React.PropTypes;

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
    var messageHistory = MessageStore.returnChatlog(this.props.receiver.id),
        currentUser = UserStore.currentUser();

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

  render: function() {


    return (
      <div>
        <ul id='chatlog-box'>
          {this.buildChatLog()}
        </ul>
        <input
          type='text'
        />

      </div>
    );
  }

});

module.exports = MessageBox;
