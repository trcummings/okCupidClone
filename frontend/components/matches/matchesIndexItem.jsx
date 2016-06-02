var React = require('react');
var PropTypes = React.PropTypes;
var HelperUtil = require('../../util/helperUtil');
var SessionStore = require('../../stores/sessionStore');
var LikeToggle = require('../widgetButtons/likeToggle');

var MatchesIndexItem = React.createClass({

  render: function() {
    var user = this.props.user;

    return (
      <div id='match-card'>
        <div id='match-pic'>

        </div>

        <h1 id='match-username'>{user.username}</h1>
        <ul id='match-info'>
          <li>
            {HelperUtil.returnAge(user.birth_date)}
          </li>
          <li>
            {user.location}
          </li>
        </ul>

        <div id='toggle-button'>
          <LikeToggle
            liker={SessionStore.currentUser()}
            likee={user}
          />
        </div>
      </div>
    );
  }

});

module.exports = MatchesIndexItem;
