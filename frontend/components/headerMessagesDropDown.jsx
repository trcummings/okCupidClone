var React = require('react');
var ClientActions = require('../actions/clientActions');
var SessionStore = require('../stores/sessionStore');
var MessageStore = require('../stores/messageStore');

var HeaderMessagesDropDown = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  openMsgWindow: function (receiver, event) {
    event.preventDefault();

    ClientActions.openConversation(receiver);
  },

  renderConvoList: function (allConvos, currentUser) {
    var result = [];
    var receiver;

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
  },

  render: function () {
    var currentUser = SessionStore.currentUser();
    var allConvos = this.props.allConvos;
    var context = this;

    return (
      <section className='header-profile-options'>
      <ul className='messages-list'>
        { this.renderConvoList(allConvos, currentUser) }
      </ul>
      <li className='inbox-link'>
        Inbox
      </li>
    </section>
    );
  }

});

module.exports = HeaderMessagesDropDown;
