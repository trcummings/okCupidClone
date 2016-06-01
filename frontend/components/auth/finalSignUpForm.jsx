var React = require('react');
var ClientActions = require('../../actions/clientActions');
var HelperUtil = require('../../util/helperUtil');
var AuthInfoStore = require('../../stores/authInfoStore');

var FinalSignUpForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return ({
      username: "",
      password: ""
    });
  },

  handleSubmit: function () {
    var profile = AuthInfoStore.returnFinalizedProfile();
    ClientActions.signup(profile, function () {
      this.context.router.push("/");
    }.bind(this));
  },

  handleUsernameChange: function (event) {
    AuthInfoStore.addInfoPiece('username', event.target.value);
    this.setState({ username: event.target.value });
  },

  handlePasswordChange: function (event) {
    AuthInfoStore.addInfoPiece('password', event.target.value);
    this.setState({ password: event.target.value });
  },

  render: function () {
    return (
      <div className='authForm'>
        <h1> Last Step! </h1>
        <form onSubmit={this.handleSubmit}>

          <label className="username" onBlur={this.handleUsernameChange}>
            Username
            <input
              type="text"
              onChange={this.handleUsernameChange}
              />
          </label><br />

          <label className="password" onBlur={this.handlePasswordChange}>
            Password
            <input
              type="password"
              onChange={this.handlePasswordChange}
              />
          </label><br />

          <button type='submit'>Done!</button>
        </form>
      </div>
    );
  }
});

module.exports = FinalSignUpForm;
