/* globals Pusher */
var React = require('react');
var PropTypes = React.PropTypes;
var MessageStore = require('../../stores/messageStore');
var SessionStore = require('../../stores/sessionStore');
var ClientActions = require('../../actions/clientActions');
var ServerActions = require('../../actions/serverActions');
var ChatLog = require('./chatLog');

var MessageBox = React.createClass({
  getInitialState: function () {
    var currentUser = SessionStore.currentUser();
    var receiver;

    if (this.props.convo.sender === currentUser.username) {
      receiver = this.props.convo.receiver;
    } else if (this.props.convo.receiver === currentUser.username) {
      receiver = this.props.convo.sender;
    }

    return({ currentMsg: '', receiver: receiver });
  },

  // componentDidMount: function () {
  //   this.pusher = new Pusher('3d1017ad258d309a7dff', {
  //     encrypted: true
  //   });
  //
  //   var channel = this.pusher.subscribe(this.props.convo.conversation_name);
  //   channel.bind('message_sent', function(data) {
  //     debugger;
  //     // ServerActions.receiveMessage(data)
  //     // this.forceUpdate();
  //   }.bind(this));
  // },
  //
  // componentWillUnmount: function () {
  //   this.pusher.unsubscribe(this.props.convo.conversation_name);
  // },

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
    // var receiver;
    //
    // if (this.props.convo.sender === currentUser.username) {
    //   receiver = this.props.convo.receiver;
    // } else if (this.props.convo.receiver === currentUser.username) {
    //   receiver = this.props.convo.sender;
    // }

    ClientActions.sendMessage(
      this.state.currentMsg,
      [
        SessionStore.currentUser().username,
        this.state.receiver
      ],
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

          <ChatLog
            convo={convo}
          />

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
