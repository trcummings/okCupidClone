var React = require('react');
var AuthMain = require('./auth/authMain');
var SessionStore = require('../stores/sessionStore');
var ClientActions = require('../actions/clientActions');
var Header = require('./header');
var Footer = require('./footer');

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

  componentWillUnmount: function () {
    this.listener.remove();
  },

  checkForCurrentUser: function () {
    var currentUser = SessionStore.currentUser();

    if (currentUser) {
      this.setState({ currentUser: currentUser });
    }
  },

  welcome: function () {
    if (SessionStore.isUserLoggedIn()) {
      return (
        <div>
          <Header />
          {this.props.children}
          <Footer />
        </div>
      );
    } else {
      return (
        <AuthMain />
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
        {this.welcome()}
      </div>
    );
  }
});

module.exports = App;
