var React = require('react');
var HeaderProfileDropDown = require('./headerProfileDropDown');

var Header = React.createClass({
  getInitialState: function () {
    return ({ dropDown: false });
  },

  renderDropDown: function () {
    if (this.state.dropDown) {
      return (<HeaderProfileDropDown />);
    } else {
      return (<div />);
    }
  },

  toggleDropDown: function (event) {
    event.preventDefault();
    if (this.state.dropDown) {
      this.setState({ dropDown: false });
    } else {
      this.setState({ dropDown: true });
    }
  },

  render: function () {
    return (
      <header>
        <nav className='header-nav group'>
          <h1 className='header-logo'>
            <a href="#/home">PerfectPair</a>
          </h1>

          <h1 className='header-logo'>
            <a href="#/home">Matches</a>
          </h1>

          <ul className='header-list group'>
            <li>
              Visitors
            </li>

            <li>
              Likes
            </li>

            <li>
              Messages
            </li>

            <li>
              <button
                onClick={this.toggleDropDown}
              >
                Profile
              </button>
              {this.renderDropDown()}
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
