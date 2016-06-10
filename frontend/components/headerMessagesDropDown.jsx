var React = require('react');
var ClientActions = require('../actions/clientActions');
var SessionStore = require('../stores/sessionStore');

var HeaderMessagesDropDown = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount: function () {

  },

  render: function () {
    var currentUser = SessionStore.currentUser();

    return (
      <section className='header-profile-options'>
      <ul className='messages-list'>
        {
          currentUser.mutual_likes.map(function (match, index) {
            return (
              <li key={index}>
                {match.username}
              </li>
            );
          })
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
