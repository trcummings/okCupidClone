/* globals Pusher */
import React from "react";
import createClass from "create-react-class";
import PropTypes from "prop-types";

import ChatLog from "./chatLog";

import ClientActions from "../../actions/clientActions";
import ServerActions from "../../actions/serverActions";
import MessageStore from "../../stores/messageStore";
import SessionStore from "../../stores/sessionStore";

var MessageBox = createClass({
  getInitialState: function () {
    var currentUser = SessionStore.currentUser();
    var receiver;

    if (this.props.convo.sender === currentUser.username) {
      receiver = this.props.convo.receiver;
    } else if (this.props.convo.receiver === currentUser.username) {
      receiver = this.props.convo.sender;
    }

    return {
      currentMsg: "",
      receiver: receiver,
      isOpen: true,
      enterToSend: true,
    };
  },

  closeWindow: function (event) {
    event.preventDefault();

    ClientActions.closeConvo(this.props.convo.conversation_name);
  },

  minimizeWindow: function (event) {
    event.preventDefault();

    this.setState({ isOpen: false });
  },

  maximizeWindow: function (event) {
    event.preventDefault();

    this.setState({ isOpen: true });
  },

  handleTextChange: function (event) {
    event.preventDefault();

    if (event.nativeEvent.keyCode !== 13) {
      this.setState({ currentMsg: event.target.value });
    }
  },

  toggleEnterToSend: function () {
    if (this.state.enterToSend) {
      this.setState({ enterToSend: false });
    } else {
      this.setState({ enterToSend: true });
    }
  },

  sendMessage: function () {
    ClientActions.sendMessage(
      this.state.currentMsg,
      [SessionStore.currentUser().username, this.state.receiver],
      function () {
        this.setState({ currentMsg: "" });
      }.bind(this)
    );
  },

  handleEnter: function (event) {
    if (this.state.enterToSend) {
      if (event.nativeEvent.keyCode === 13 && event.target.value !== "") {
        this.sendMessage();
      }
    }
  },

  render: function () {
    var convo = this.props.convo;
    var otherName = this.props.convo.conversation_name.split("_");
    var nameIndex = otherName.indexOf(SessionStore.currentUser().username);
    otherName.splice(nameIndex, 1);
    otherName = otherName[0];

    if (convo) {
      if (this.state.isOpen) {
        return (
          <div className="chat-window biggied">
            <button className="close-window-button" onClick={this.closeWindow}>
              X
            </button>

            <button onClick={this.minimizeWindow}>
              <h1>{"Conversation with " + otherName}</h1>
            </button>

            <ChatLog convo={convo} />

            <input
              onChange={this.handleTextChange}
              type="text"
              onKeyPress={this.handleEnter}
              className="new-message-box"
              value={this.state.currentMsg}
            />

            <button onClick={this.sendMessage} className="send-message-button">
              Send
            </button>

            <label className="enter-toggle">
              Enter to send{" "}
              <input
                className="enter-checkbox"
                type="checkbox"
                onChange={this.toggleEnterToSend}
                defaultChecked={this.state.enterToSend}
              />
            </label>
          </div>
        );
      } else {
        return (
          <div className="chat-window minied">
            <button onClick={this.closeWindow}>X</button>
            <button onClick={this.maximizeWindow}>{otherName}</button>
          </div>
        );
      }
    } else {
      return <div />;
    }
  },
});

export default MessageBox;
