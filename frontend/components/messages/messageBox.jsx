var React = require('react');
var PropTypes = React.PropTypes;
var MessageStore = require('../../stores/messageStore');
var SessionStore = require('../../stores/sessionStore');
var ClientActions = require('../../actions/clientActions');
var ChatLog = require('./chatLog');

var MessageBox = React.createClass({
  getInitialState: function () {
    return({ currentMsg: '' });
  },

  componentDidMount: function () {
    // this.chatListener = MessageStore.addListener(function () {
    //   var convo = MessageStore.activeConvos();
    //   convo.forEach(function (conversation, index) {
    //     if (conversation.conversation_name === this.props.convo.conversation_name) {
    //       this.setState({ convo: conversation });
    //     }
    //   }.bind(this));
    // }.bind(this));

    // var pusher = new Pusher('3d1017ad258d309a7dff', {
    //   encrypted: true
    // });
    //
    // var channel = pusher.subscribe(this.props.conversation_name);
    // channel.bind('my_event', function(data) {
      // push message data to store
      // callback;
    // });
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
    var receiver;

    if (this.props.convo.sender === currentUser.username) {
      receiver = this.props.convo.receiver;
    } else if (this.props.convo.receiver === currentUser.username) {
      receiver = this.props.convo.sender;
    }

    ClientActions.sendMessage(
      this.state.currentMsg,
      [currentUser.username, receiver],
      function () {
        this.setState({ currentMsg: '' });
      }.bind(this)
    );
  },

  render: function () {
    var convo = this.props.convo;

    if (convo) {
      return (
        <div className='chat-window'>
          <button onClick={this.closeWindow}>X</button>

          <h1>
            {'Conversation between ' + convo.sender + ' and ' + convo.receiver}
          </h1>

          <ChatLog messages={convo.messages} />

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
