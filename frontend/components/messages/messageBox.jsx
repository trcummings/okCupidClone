var React = require('react');
var PropTypes = React.PropTypes;
var MessageStore = require('../../stores/messageStore');
var SessionStore = require('../../stores/sessionStore');
var ClientActions = require('../../actions/clientActions');

var MessageBox = React.createClass({
  getInitialState: function () {
    return({ currentMsg: '' });
  },
  // getInitialState: function () {
  //   var currentUser = SessionStore.currentUser();
  //   var convoName = this.props.convo.conversation_name.split(' ');
  //   var targetIdx = convoName.indexOf(currentUser.username);
  //   convoName.splice(targetIdx, 1);
  //
  //   return ({ otherUsername: convoName[0] });
  // },

  // componentDidMount: function () {
  //   this.chatListener = MessageStore.addListener(function () {
  //     var convo = MessageStore.activeConvos();
  //     convo.forEach(function (conversation, index) {
  //       if (conversation.conversation_name === this.props.convo.conversation_name) {
  //         this.setState({ convo: conversation });
  //       }
  //     }.bind(this));
  //   }.bind(this));
  //
  //   // var pusher = new Pusher('3d1017ad258d309a7dff', {
  //   //   encrypted: true
  //   // });
  //   //
  //   // var channel = pusher.subscribe(this.props.conversation_name);
  //   // channel.bind('my_event', function(data) {
  //     // push message data to store
  //     // callback;
  //   // });
  // },

  buildChatLog: function (convo) {
    var currentUser = SessionStore.currentUser();
    var receiver = convo.receiver;
    var result = [];

    convo.messages.forEach(function (message, index) {
      if (receiver.username !== currentUser.username) {
        result.push(
          <li
            key={index}
            className='current-user-message'
          >
            {message.content}
          </li>
        );
      } else {
        result.push(
          <li
            key={index}
            className='other-user-message'
          >
            {message.content}
          </li>
        );
      }
    }.bind(this));

    return result;
  },

  closeWindow: function (event) {
    event.preventDefault();

    ClientActions.closeConvo(this.props.convo.conversation_name);
  },

  handleTextChange: function (event) {
    event.preventDefault();

    this.setState({ currentMsg: event.target.value });
  },

  sendMessage: function () {
    event.preventDefault();
    var currentUser = SessionStore.currentUser();
    var sender;
    var receiver;

    if (this.props.convo.sender === currentUser.username) {
      sender = this.props.convo.receiver;
      receiver = currentUser.username;
    } else if (this.props.convo.receiver === currentUser.username) {
      sender = currentUser.username;
      receiver = this.props.convo.sender;
    }

    ClientActions.sendMessage(
      this.state.currentMsg,
      [sender, receiver],
      function () {
        this.setState({ currentMsg: '' });
      }.bind(this)
    );


  },

  render: function () {
    var convo = this.props.convo;
    var currentUser = SessionStore.currentUser();

    var usernames = this.props.convo.conversation_name.split(' ');
    var targetIdx = usernames.indexOf(currentUser.username);
    usernames.splice(targetIdx, 1);
    var otherUsername = usernames[0];

    if (convo) {
      return (
        <div id='chat-window'>
          <button onClick={this.closeWindow}>X</button>

          <h1>
            {'Conversation between ' + currentUser.username + ' and ' + otherUsername}
          </h1>

          <ul id='chatlog-box'>
            {this.buildChatLog(convo)}
          </ul>

          <input
            onChange={this.handleTextChange}
            type='text'
            className='new-message-box'
            value={this.state.currentMsg}
          />

          <button
            onClick={this.sendMessage}
            className='send-message-button'
          >
            Send
          </button>
        </div>
      );
    } else {
      return (<div />);
    }


  }

});

module.exports = MessageBox;
