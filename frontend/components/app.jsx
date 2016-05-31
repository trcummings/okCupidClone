var React = require('react');
var AuthMain = require('./auth/authMain');
var SessionStore = require('../stores/sessionStore');
var ClientActions = require('../actions/clientActions');

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return { currentUser: SessionStore.currentUser() };
  },

  componentDidMount: function () {
    this.listener = SessionStore.addListener(function () {
      this.checkForCurrentUser();
    }.bind(this));
  },

  checkForCurrentUser: function () {
    var currentUser = SessionStore.currentUser();

    if (currentUser) {
      this.setState({ currentUser: currentUser });
    }
  },

  welcome: function () {
    //// change this shit ASAP when you get the header in
    if (SessionStore.isUserLoggedIn()) {
      return (
        <div>
          <header>
            <span>Welcome {this.state.currentUser.username}</span>
            <button onClick={this.handleClick}>Log Out!~</button>
            {this.props.children}
          </header>
        </div>
      );
    } else {
      return (
        <div>nobody logged in/hogged in</div>
      );
    }
  },

  handleClick: function (event) {
    event.preventDefault();

    ClientActions.logout(function () {
      this.context.router.push("/");
    }.bind(this));
  },

  render: function () {
    return (
      <div>
        <AuthMain />
        {this.welcome()}
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
