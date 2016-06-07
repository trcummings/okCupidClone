var React = require('react');
var PropTypes = React.PropTypes;
var SessionStore = require('../../stores/sessionStore');

var WhoLikesYou = React.createClass({
  renderUserList: function () {
    var currentUser = SessionStore.currentUser();

    return (
      <ul>
      {
        currentUser.likers.map(function (user, index) {
          return (
            <li>
              <span key={index}>{user.username}</span>
            </li>
          );
        })
      }
      </ul>
    );
  },

  render: function() {

    return (
      <div className='user-list-box'>
        <ul>
          {this.renderUserList()}
        </ul>
      </div>
    );
  }

});

module.exports = WhoLikesYou;
