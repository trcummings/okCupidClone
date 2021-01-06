import React from "react";
import createClass from "create-react-class";
import PropTypes from "prop-types";

import ClientActions from "../../actions/clientActions";
import MessageStore from "../../stores/messageStore";
import SessionStore from "../../stores/sessionStore";

var MessageButton = createClass({
  handleOpenMessage: function (event) {
    event.preventDefault();

    var currentUser = SessionStore.currentUser();
    var chatUsers,
      curUsIdx,
      allRecipients = [];

    currentUser.conversations.forEach(function (conversation, index) {
      chatUsers = conversation.conversation_name.split(" ");
      curUsIdx = chatUsers.indexOf(currentUser.username);
      chatUsers.splice(curUsIdx, 1);

      allRecipients.push(chatUsers[0]);
    });

    if (allRecipients.indexOf(this.props.targetUser.username) !== -1) {
      ClientActions.openConversation(this.props.targetUser);
    } else {
      ClientActions.createNewConversation(this.props.targetUser);
    }
  },

  render: function () {
    return (
      <button id="message-button" onClick={this.handleOpenMessage}>
        Message
      </button>
    );
  },
});

export default MessageButton;
