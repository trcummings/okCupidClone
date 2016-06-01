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
      <header>
        <nav className='header-nav group'>
          <h1 className='header-logo'>
            <a href="#/home">PerfectPair</a>
          </h1>

          <h1 className='header-logo'>
            <a href="#/matches">Browse Matches</a>
          </h1>

          <ul className='header-list group'>
            <li>
              Visitors
            </li>

            <li>
              Likes
            </li>

            <li>
              <button
                onClick={this.toggleDropDown.bind(this, 'messagesDropDown')}
              >
                Messages
              </button>
              {this.renderDropDown('messagesDropDown')}
            </li>

            <li>
              <button
                onClick={this.toggleDropDown.bind(this, 'profileDropDown')}
              >
                Profile
              </button>
              {this.renderDropDown('profileDropDown')}
            </li>
          </ul>
        </nav>
      </header>
    );
  }
});

module.exports = Header;



//profile dropdown
//profile

//find a user

//settings

//log out
