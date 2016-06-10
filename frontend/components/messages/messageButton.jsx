var React = require('react');
var PropTypes = React.PropTypes;
var MessageStore = require('../../stores/messageStore');
var ClientActions = require('../../actions/clientActions');
var SessionStore = require('../../stores/sessionStore');

var MessageButton = React.createClass({
  handleOpenMessage: function (event) {
    event.preventDefault();

    var currentUser = SessionStore.currentUser();
    var chatUsers, curUsIdx, allRecipients = [];

    currentUser.conversations.forEach(function (conversation, index) {
      chatUsers = conversation.conversation_name.split(' ');
      curUsIdx = chatUsers.indexOf(currentUser.username);
      chatUsers.splice(curUsIdx, 1);

      allRecipients.push(chatUsers[0]);
    });

    if (allRecipients.indexOf(this.props.targetUser.username) !== -1) {
      // debugger;
      ClientActions.openConversation(this.props.targetUser);
    } else {
      ClientActions.createNewConversation(this.props.targetUser);
    }
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
