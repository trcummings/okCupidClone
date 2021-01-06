import React from "react";
import createClass from "create-react-class";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import ClientActions from "../../actions/clientActions";
import SessionStore from "../../stores/sessionStore";

var ChatLog = createClass({
  getInitialState: function () {
    return {
      convo: this.props.convo,
    };
  },

  componentDidMount: function () {
    var node = ReactDOM.findDOMNode(this);
    node.scrollTop = node.scrollHeight;
    var convo = this.state.convo;

    this.pusher = new Pusher("3d1017ad258d309a7dff", {
      encrypted: true,
    });

    var receiver;

    if (convo.sender === SessionStore.currentUser().username) {
      receiver = convo.receiver;
    } else if (convo.receiver === SessionStore.currentUser().username) {
      receiver = convo.sender;
    }

    var channel = this.pusher.subscribe(convo.conversation_name);
    channel.bind(
      "message_sent",
      function (data) {
        ClientActions.openConversation(receiver);
      }.bind(this)
    );
  },

  componentWillUpdate: function () {
    var node = ReactDOM.findDOMNode(this);
    this.shouldScrollBottom =
      node.scrollTop + node.offsetHeight === node.scrollHeight;
  },

  componentDidUpdate: function () {
    if (this.shouldScrollBottom) {
      var node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  },

  componentWillReceiveProps: function (nextProps) {
    var node = ReactDOM.findDOMNode(this);
    node.scrollTop = node.scrollHeight;
    this.shouldScrollBottom =
      node.scrollTop + node.offsetHeight === node.scrollHeight;
    this.setState({ convo: nextProps.convo });
  },

  componentWillUnmount: function () {
    this.pusher.unsubscribe(this.state.convo.conversation_name);
  },

  render: function () {
    var result = [];
    var convo = this.state.convo;

    convo.messages.forEach(
      function (message, index) {
        if (index === convo.messages.length) {
          ReactDOM.findDOMNode(this).scrollTop = 0;
        }
        if (message.sender === SessionStore.currentUser().username) {
          result.push(
            <li key={index} className="msg-item">
              <p className="current-user-message">{message.content}</p>
            </li>
          );
        } else {
          result.push(
            <li key={index} className="msg-item">
              <p className="other-user-message">{message.content}</p>
            </li>
          );
        }
      }.bind(this)
    );

    return <ul className="chatlog-box">{result}</ul>;
  },
});

export default ChatLog;
