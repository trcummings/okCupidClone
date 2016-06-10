var React = require('react');
var PropTypes = React.PropTypes;
var ClientActions = require('../../actions/clientActions');
var UserStore = require('../../stores/userStore');
var LikeToggle = require('../widgetButtons/likeToggle');
var PhotoStore = require('../../stores/photoStore');
var SessionStore = require('../../stores/sessionStore');
var MessageButton = require('../messages/messageButton');

var MatchDetail = React.createClass({
  getInitialState: function () {
    return {
      viewedUser: UserStore.viewedUser(),
      theirPhotos: PhotoStore.otherUserAllPhotos()
    };
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(function () {
      this.setState({ viewedUser: UserStore.viewedUser() });
    }.bind(this));

    this.photoListener = PhotoStore.addListener(function () {
      this.setState({ theirPhotos: PhotoStore.otherUserAllPhotos() });
    }.bind(this));

    var thisUserUsername = this.props.routeParams.username;

    ClientActions.fetchSingleUser(thisUserUsername);
    ClientActions.getOtherUserPics(thisUserUsername);
    ClientActions.getOtherUserAbout(thisUserUsername);
  },

  componentWillUnmount: function () {
    this.userListener.remove();
    this.photoListener.remove();
  },

  renderEachSection: function () {
    var aboutDetail = this.state.viewedUser.about;

    var fieldList = [
      'My Self Summary',
      'What I’m doing with my life',
      'I’m really good at',
      'Favorite books, movies, shows, music, and food',
      'The six things I could never do without',
      'I spend a lot of time thinking about',
      'On a typical Friday night I am',
      'You should message me if'
     ];
    var result = [];
    var i = 0;

    if (aboutDetail) {
      for (var property in aboutDetail) {
        if (aboutDetail.hasOwnProperty(property)) {
            result.push(
              <li key={i} className='profile-detail-section group'>
                <p className='about-title'>{fieldList[i]}</p>
                <p className='info-box'>{aboutDetail[property]}</p>
              </li>
            );
            i++;
          }
        }

      return result;
    } else {
      return (<div />);
    }
  },

  render: function() {
    var profilePhoto;
    var thisUser = this.state.viewedUser;
    if (thisUser.default_photo_url) {
      profilePhoto = thisUser.default_photo_url;
    } else {
      profilePhoto = window.anon;
    }

    if (thisUser.username) {
      return (
        <div id='viewed-user-profile-main' className='group'>
          <article id='viewed-user-header' className='group'>
            <div id='viewed-user-content' className='group'>
              <div id='viewed-user-thumbs'>
                <img
                  src={profilePhoto}
                  alt={'A picture of' + thisUser.username}
                />
              </div>

              <div id='basic-information'>
                <h1 id='user-name'>{thisUser.username}</h1>
                <ul id='basic-information'>
                  <li>
                    {thisUser.age}
                  </li>
                  <li>
                    {thisUser.location}
                  </li>
                </ul>
              </div>

              <article id='widget-buttons' className='group'>
                <LikeToggle
                  likee={thisUser}
                  liker={SessionStore.currentUser()} />
                <MessageButton targetUser={thisUser}/>
              </article>
            </div>
          </article>

        <div id='rest-of-match-detail' className='group'>
          <section id='left-column'>
            <ul>
              {this.renderEachSection()}
            </ul>
          </section>
        </div>
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
