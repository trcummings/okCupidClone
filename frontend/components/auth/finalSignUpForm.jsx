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
      this.context.router.push("/home");
    }.bind(this));
  },

  handleUsernameChange: function (event) {
    if (event.target.value !== "") {
      AuthInfoStore.addInfoPiece('username', event.target.value);
      this.setState({ username: event.target.value });
    } else {
      this.setState({ usernameValidityMsg: "You need a username!"});
    }
  },

  handlePasswordChange: function (event) {
    if (event.target.value !== "") {
      AuthInfoStore.addInfoPiece('password', event.target.value);
      this.setState({ password: event.target.value });
    } else {
      this.setState({ passwordValidityMsg: "You need a password!"});
    }
  },

  render: function () {
    return (
      <div className='authForm'>
        <h1> Last Step! </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="row group">
            <label className="username text_box_item form_three_item" onBlur={this.handleUsernameChange}>
              Username
              <input
                type="text"
                onChange={this.handleUsernameChange}
                placeholder="This will be public"
                />
            </label>

            <span className="username-validity-msg">
              {this.state.usernameValidityMsg}
            </span>
          </div>

          <div className="row group">
            <label className="password text_box_item form_three_item" onBlur={this.handlePasswordChange}>
              Password
              <input
                type="password"
                onChange={this.handlePasswordChange}
                />
            </label>

            <span className="password-validity-msg">
              {this.state.passwordValidityMsg}
            </span>
          </div>

          <div className="row group">
            <button
              id="continue_button"
              className="flatbutton green form_three_item"
              type='submit'
            >
              Done!
            </button>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = FinalSignUpForm;
