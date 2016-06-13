var React = require('react');
var ClientActions = require('../actions/clientActions');
var SessionStore = require('../stores/sessionStore');
var MessageStore = require('../stores/messageStore');

var HeaderMessagesDropDown = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return({ allConvos: MessageStore.allConversations() });
  },

  componentDidMount: function () {
    this.messageListener = MessageStore.addListener(function () {
      this.setState({ allConvos: MessageStore.allConversations() });
    }.bind(this));

    // this.pushers = {};
    // var channel;

    // this.state.allConvos.forEach(function (convo, index) {
    //   this.pushers[index] = new Pusher('3d1017ad258d309a7dff', {
    //     encrypted: true
    //   });
    //
    //   channel = this.pushers[index].subscribe(convo.conversation_name);
    //   channel.bind('message_sent', function(data) {
    //     debugger;
    //     ClientActions.getConversation(convo.conversation_name);
    //   });
    // })

    ClientActions.getAllConvos();
  },

  componentWillUnmount: function () {
    this.messageListener.remove();
    // this.state.allConvos.forEach(function (convo, index) {
    //   this.pushers[index].unsubscribe(convo.conversation_name)
    // });
  },

  openMsgWindow: function (receiver, event) {
    event.preventDefault();

    ClientActions.openConversation(receiver);
  },

  renderConvoList: function (allConvos, currentUser) {
    var result = [];
    var receiver;

    if (allConvos.length === 0) {
      return (
        <li
          className='no-messages'
        >
          No Messages
        </li>
      );
    } else {
      allConvos.map(function (convo, index) {
        if (currentUser.username === convo.sender) {
          receiver = convo.receiver;
        } else {
          receiver = convo.sender;
        }

        result.push (
          <li
            key={index}
            onClick={this.openMsgWindow.bind(this, receiver)}
          >
            {receiver}
          </li>
        );
      }.bind(this));

      return result;
    }
  },

  render: function () {
    return (
      <section className='header-profile-options messages'>
        <i className="fa fa-caret-up" aria-hidden="true"></i>
      <ul className='messages-list'>
        { this.renderConvoList(
            this.state.allConvos,
            SessionStore.currentUser()
          )
        }
      </ul>
      <li className='inbox-link'>
        Inbox
      </li>
    </section>
    );
  }
});

module.exports = HeaderMessagesDropDown;
