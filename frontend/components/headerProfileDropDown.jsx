var React = require('react');
var ClientActions = require('../actions/clientActions');

var HeaderProfileDropDown = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleLogOut: function (event) {
    event.preventDefault();

    ClientActions.logout(function () {
      this.context.router.push("/");
    }.bind(this));
  },

  redirectToProfile: function () {
    this.context.router.push("/profile");
  },

  render: function () {
    return (
      <ul className='header-profile-options'>
        <li>
          <button onClick={this.redirectToProfile}>
            Profile
          </button>
        </li>

        <li>
          <button onClick={this.handleLogOut}>
            Log Out
          </button>
        </li>
      </ul>
    );
  }

});

module.exports = HeaderProfileDropDown;
