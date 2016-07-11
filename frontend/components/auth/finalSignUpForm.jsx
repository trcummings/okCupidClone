var React = require('react');
var ClientActions = require('../../actions/clientActions');
var HelperUtil = require('../../util/helperUtil');
var AuthInfoStore = require('../../stores/authInfoStore');
var UsernameInput = require('./finalSignUpFormItems/usernameInput');

var FinalSignUpForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return ({
      password: ""
    });
  },

  handleSubmit: function (event) {
    event.preventDefault()
    var profile = AuthInfoStore.returnFinalizedProfile();

    ClientActions.signup(profile, function () {
      this.context.router.push("/matches");
    }.bind(this));
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
          <UsernameInput />

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
              className="flatbutton form_three_item"
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
