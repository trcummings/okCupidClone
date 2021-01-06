import React from "react";
import createClass from "create-react-class";
import PropTypes from "prop-types";

import MessageBox from "./messages/MessageBox";

import MessageStore from "../stores/messageStore";

var Footer = createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
  },

  getInitialState: function () {
    return { activeConvos: MessageStore.activeConvos() };
  },

  componentDidMount: function () {
    var activeConvos;

    this.messageListener = MessageStore.addListener(
      function () {
        activeConvos = MessageStore.activeConvos();

        this.setState({
          activeConvos: activeConvos,
        });
      }.bind(this)
    );
  },

  componentWillUnmount: function () {
    this.messageListener.remove();
  },

  renderMessageBoxes: function () {
    if (this.state.activeConvos.length > 0) {
      return this.state.activeConvos.map(
        function (convo, index) {
          return <MessageBox key={index} convo={convo} />;
        }.bind(this)
      );
    } else {
      return <div />;
    }
  },

  render: function () {
    return (
      <footer id="profile-footer" className="group">
        <section className="message-boxes">{this.renderMessageBoxes()}</section>

        <section>
          <ul className="footer-links">
            <li>
              <a href="https://github.com/trcummings">Creator's Github</a>
            </li>
            <li>
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                Free Bitcoin
              </a>
            </li>
          </ul>

          <p className="footer-copyright">
            <a href="#/matches">
              <i className="fa fa-creative-commons" aria-hidden="true"></i>
              PerfectPair 2016
            </a>
          </p>
        </section>

        <div></div>
      </footer>
    );
  },
});

export default Footer;
