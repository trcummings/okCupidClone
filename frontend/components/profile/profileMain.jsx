var React = require('react');
var ClientActions = require('../../actions/clientActions');
var SessionStore = require('../../stores/sessionStore');

var ProfileMain = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return { currentUser: SessionStore.currentUser()};
  },

  componentDidMount: function () {
    this.listener = SessionStore.addListener(function () {
      this.checkForCurrentUser();
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  checkForCurrentUser: function () {
    var currentUser = SessionStore.currentUser();

    if (currentUser) {
      this.setState({ currentUser: currentUser });
    }
  },

  handleClick: function (event) {
    event.preventDefault();

    ClientActions.logout(function () {
      this.context.router.push("/");
    }.bind(this));
  },

  render: function () {
    var currentUser = this.state.currentUser;

    if (currentUser) {
      return (
        <div>
          o shit waddup {this.state.currentUser.username}!
          <button onClick={this.handleClick} type='submit'>Log Out!~</button>
        </div>
      );
    } else {
      return (
        <div>
          scoobert doobert!
          you shouldn't be here!
        </div>
      );
    }
  }
});

module.exports = ProfileMain;
