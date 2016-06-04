var React = require('react');
var PropTypes = React.PropTypes;
var ClientActions = require('../../actions/clientActions');
var UserStore = require('../../stores/userStore');
var LikeToggle = require('../widgetButtons/likeToggle');
var HelperUtil = require('../../util/helperUtil');
var PhotoStore = require('../../stores/photoStore');
var SessionStore = require('../../stores/sessionStore');

var MatchDetail = React.createClass({
  getInitialState: function () {
    return {
      viewedUser: UserStore.viewedUser(),
      theirPhotos: PhotoStore.otherUserAllPhotos()
    };
  },

  componentDidMount: function () {
    var thisUserUsername = this.props.routeParams.username;

    this.userListener = UserStore.addListener(function () {
      this.setState({ viewedUser: UserStore.viewedUser( )});
      ClientActions.getOtherUserPics(this.state.viewedUser.id);

    }.bind(this));

    this.photoListener = PhotoStore.addListener(function () {
      this.setState({ theirPhotos: PhotoStore.otherUserAllPhotos() });
    }.bind(this));

    ClientActions.fetchSingleUser(thisUserUsername);
  },

  componentWillUnmount: function () {
    this.userListener.remove();
    this.photoListener.remove();
  },

  render: function() {
    var thisUser = this.state.viewedUser;
    var profilePhoto = PhotoStore.otherUserDefaultProfilePic();

    if (thisUser.username) {
      return (
        <div id='viewed-user-profile-main' className='group'>
          <article id='viewed-user-header' className='group'>
            <div id='viewed-user-thumbs'>
              <img
                src={profilePhoto.photo_url}
                alt={'A picture of' + thisUser.username}
              />
            </div>

            <div id='basic-information'>
              <h1 id='user-name'>{thisUser.username}</h1>
              <ul id='basic-information'>
                <li>
                  {HelperUtil.returnAge(thisUser.birth_date)}
                </li>
                <li>
                  {thisUser.location}
                </li>
              </ul>
            </div>

            <article id='widget-buttons' className='group'>
              <LikeToggle targetUser={thisUser} />
              <button id='message-button'>Message</button>
            </article>
        </article>
        </div>
      );
    } else {
      return (<div />);
    }
  }

});

// {
//   currentUserPhotos.map(function (photo, index) {
//     return (
//       <img
//         key={index}
//         className={'user-photo'}
//         src={photo.photo_url}
//         alt={'Photo of ' + currentUser.username }
//       />
//     );
//   })
// }


module.exports = MatchDetail;
