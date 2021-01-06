import React from "react";
import createClass from "create-react-class";
import PropTypes from "prop-types";

import ClientActions from "../actions/clientActions";
import SessionStore from "../stores/sessionStore";
import MessageStore from "../stores/messageStore";

var HeaderMessagesDropDown = createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
  },

  getInitialState: function () {
    return { allConvos: MessageStore.allConversations() };
  },

  componentDidMount: function () {
    this.messageListener = MessageStore.addListener(
      function () {
        this.setState({ allConvos: MessageStore.allConversations() });
      }.bind(this)
    );

    ClientActions.getAllConvos();
  },

  componentWillUnmount: function () {
    this.messageListener.remove();
  },

  openMsgWindow: function (receiver, event) {
    event.preventDefault();

    ClientActions.openConversation(receiver);
  },

  renderConvoList: function (allConvos, currentUser) {
    var result = [];
    var receiver;

    if (allConvos.length === 0) {
      return <li className="no-messages">No Messages</li>;
    } else {
      allConvos.map(
        function (convo, index) {
          if (currentUser.username === convo.sender) {
            receiver = convo.receiver;
          } else {
            receiver = convo.sender;
          }

          result.push(
            <li key={index} onClick={this.openMsgWindow.bind(this, receiver)}>
              {receiver}
            </li>
          );
        }.bind(this)
      );

      return result;
    }
  },

  render: function () {
    return (
      <section className="header-profile-options messages">
        <i className="fa fa-caret-up" aria-hidden="true"></i>
        <ul className="messages-list">
          {this.renderConvoList(
            this.state.allConvos,
            SessionStore.currentUser()
          )}
        </ul>
      </section>
    );
  },
});

export default HeaderMessagesDropDown;
