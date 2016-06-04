var React = require('react');
var HeaderProfileDropDown = require('./headerProfileDropDown');
var HeaderMessagesDropDown = require('./headerMessagesDropDown');

var Header = React.createClass({
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

  toggleDropDown: function (type) {
    if (this.state[type]) {
      this.state[type] = false;
    } else {
      this.state[type] = true;
    }
    this.setState(this.state);
  },

  render: function () {
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
            <li id='glyph'>
              [V]
              <p>Visitors</p>
            </li>

            <li id='glyph'>
              [L]
              <p>Likes</p>
            </li>

            <li id='messages-drop-down'>
              <button
                onClick={this.toggleDropDown.bind(this, 'messagesDropDown')}
                >
                Messages
              </button>
              {this.renderDropDown('messagesDropDown')}
            </li>

            <li id='profile-drop-down'>
              <button
                onClick={this.toggleDropDown.bind(this, 'profileDropDown')}
                >
                Profile
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
