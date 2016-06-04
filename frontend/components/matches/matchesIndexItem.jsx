var React = require('react');
var PropTypes = React.PropTypes;
var HelperUtil = require('../../util/helperUtil');
var SessionStore = require('../../stores/sessionStore');
var LikeToggle = require('../widgetButtons/likeToggle');
var ClientActions = require('../../actions/clientActions');
var PhotoStore = require('../../stores/photoStore');

var MatchesIndexItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  // getInitialState: function () {
  //   return {
  //     profilePhoto: PhotoStore.otherUserDefaultProfilePic()
  //   };
  // },

  // componentDidMount: function () {
  //   this.photoListener = PhotoStore.addListener(function () {
  //     this.setState({
  //       profilePhoto: PhotoStore.otherUserDefaultProfilePic()
  //   });
  //   }.bind(this));
  //
  //   ClientActions.getOtherUserPics(this.props.user.id);
  // },

  // componentWillUnmount: function () {
  //   this.photoListener.remove();
  // },

  renderMatchDetail: function () {
    this.context.router.push('/profile/' + this.props.user.username);
  },

  renderProfilePhoto: function () {
    var user = this.props.user;
    // var profilePhoto = this.state.profilePhoto;

    if (user.default_photo_url) {
      return (
        <img
          src={user.default_photo_url}
          alt={'Photo of ' + user.username}
          />
      );
    } else {
      return (<div />);
    }

  },

  render: function() {
    // debugger;
    var user = this.props.user;

    return (
      <div
        id='match-card'
        className='group'
        onClick={this.renderMatchDetail}>
        <div id='match-pic'>
          {this.renderProfilePhoto()}
        </div>

        <div id='match-info-container' className= 'group'>

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
      </div>
    );
  }

});

module.exports = MatchesIndexItem;
