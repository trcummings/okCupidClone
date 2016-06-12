var React = require('react');
var HeaderProfileDropDown = require('./headerProfileDropDown');
var HeaderMessagesDropDown = require('./headerMessagesDropDown');
var SessionStore = require('../stores/sessionStore');
var ClientActions = require('../actions/clientActions');

var Header = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return ({
      profileDropDown: false,
      messagesDropDown: false
     });
  },
  //
  // componentDidMount: function () {
  //   this.pusher = new Pusher('3d1017ad258d309a7dff', {
  //     encrypted: true
  //   });
  //
  //
  //   var channel = this.pusher.subscribe(liker.username + '_' + likee.username);
  //   channel.bind('convo_created', function(data) {
  //     ClientActions.getAllConvos();
  //   });
  //
  //   ClientActions.getAllConvos();
  // },
  //
  // componentWillUnmount: function () {
  //   this.messageListener.remove();
  //   this.
  // },


  renderDropDown: function (type) {
    if (this.state[type]) {
      if (type === 'profileDropDown') {
        return (<HeaderProfileDropDown />);
      } else if (type === 'messagesDropDown') {
        return (<HeaderMessagesDropDown />);
      }
    } else {
      return (<div />);
    }
  },

  handleLikesClick: function () {
    this.context.router.push("/likes");
  },

  handleVisitorsClick: function () {
    alert("doesnt' do anything yet!");
  },

  toggleDropDown: function (type) {
    if (this.state[type]) {
      this.state[type] = false;
    } else {
      this.state[type] = true;
    }
    this.setState(this.state);
  },

  render: function () {
    var currentUser = SessionStore.currentUser();
    var thumbnailImage;

    if (currentUser.photos[0]) {
      thumbnailImage = currentUser.photos[0].photo_url;
    } else {
      thumbnailImage = window.anon;
    }

    return (
      <nav id='navigation' className='main-header'>
        <div id='nav-left'>
          <h1 className='nav-logo'>
            <a href="#/matches">
              <img id='logo' src={window.logo} />
            </a>
          </h1>

          <ul className='nav-links nav-item'>
            <li>
              <a href="#/matches">Browse Matches</a>
            </li>
          </ul>
        </div>

        <div id='nav-right'>
          <ul className='nav-links nav-item group'>
            <li className='glyph' onClick={this.handleVisitorsClick} >
              <i className="fa fa-users fa-2" aria-hidden="true"></i>
              <p id='visitors-glyph'>
                <i className="fa fa-caret-up" aria-hidden="true"></i>
                <span className='poptext'>Visitors</span>
                <span className='blankbox'> </span>
              </p>
            </li>

            <li className='glyph' onClick={this.handleLikesClick}>
              <i className='fa fa-star fa-2' aria-hidden='true'></i>
              <p id='likes-glyph'>
                <i className="fa fa-caret-up" aria-hidden="true"></i>
                <span className='poptext'>Likes</span>
                <span className='blankbox'> </span>
              </p>
            </li>

            <li id='messages-drop-down glyph'>
              <button
                onClick={this.toggleDropDown.bind(this, 'messagesDropDown')}
                >

                <i className="fa fa-comment fa-2" aria-hidden="true"></i>
              </button>
              {this.renderDropDown('messagesDropDown')}
            </li>

            <li id='profile-drop-down'>
              <button
                onClick={this.toggleDropDown.bind(this, 'profileDropDown')}
                >
                <img
                  id='user-thumbnail'
                  src={thumbnailImage}
                />
              </button>
              {this.renderDropDown('profileDropDown')}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
});

module.exports = Header;


// <section className='message-boxes'>
//   {this.renderMessageBoxes()}
// </section>
