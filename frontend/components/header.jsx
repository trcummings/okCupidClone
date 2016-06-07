var React = require('react');
var HeaderProfileDropDown = require('./headerProfileDropDown');
var HeaderMessagesDropDown = require('./headerMessagesDropDown');
var SessionStore = require('../stores/sessionStore');

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

    return (
      <nav id='navigation'>
        <div id='nav-left'>
          <h1 className='nav-logo'>
            <a href="#/home">
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
            <li id='glyph' >
              <i className="fa fa-users fa-2" aria-hidden="true"></i>
              <p id='visitors-glyph'>Visitors</p>
            </li>

            <li id='glyph' onClick={this.handleLikesClick}>
              <i className='fa fa-star fa-2' aria-hidden='true'></i>
              <p id='likes-glyph'>
                <i className="fa fa-caret-up" aria-hidden="true"></i>
                Likes
              </p>
            </li>

            <li id='messages-drop-down'>
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
                  src={currentUser.photo_url}
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



//profile dropdown
//profile

//find a user

//settings

//log out
