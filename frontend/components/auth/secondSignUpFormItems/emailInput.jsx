var React = require("react");
var PropTypes = React.PropTypes;
var AuthInfoStore = require("../../../stores/authInfoStore");
var ClientActions = require("../../../actions/clientActions");

var EmailInput = React.createClass({
  getInitialState: function () {
    return {
      emailErrored: "",
      emailStatus: "",
      uniqueEmailVerified: false,
    };
  },

  componentDidMount: function () {
    this.authListener = AuthInfoStore.addListener(
      function () {
        if (AuthInfoStore.emailIsUnique === null) {
          this.setState({
            emailValidityMsg: "You need an email!",
            emailStatus: "error-field",
            emailErrored: "error-statement",
          });
        } else if (AuthInfoStore.emailIsUnique === false) {
          this.setState({
            emailValidityMsg: "That email is already in use!",
            emailStatus: "error-field",
            emailErrored: "error-statement",
          });
        } else {
          this.setState({ uniqueEmailVerified: true });
        }
      }.bind(this)
    );
  },

  componentWillUnmount: function () {
    this.authListener.remove();
  },

  handleEmailChange: function (event) {
    this.setState({ email: event.target.value });
  },

  handleDupEmailChange: function (event) {
    this.setState({ dupEmail: event.target.value });
  },

  runValidation: function () {
    if (this.state.email) {
      if (this.state.uniqueEmailVerified) {
        if (this.state.email === this.state.dupEmail) {
          AuthInfoStore.addInfoPiece("email", this.state.email);
          this.setState({
            emailValidityMsg: "",
            emailStatus: "all-clear-field",
            emailErrored: "all-clear-statement",
          });
          AuthInfoStore.emailValid = true;
          // email match success
        } else {
          this.setState({
            emailValidityMsg: "Emails don't match!",
            emailStatus: "error-field",
            emailErrored: "error-statement",
          });
        }
      } else {
        ClientActions.checkForUniqueEmail(this.state.email);
        this.setState({
          emailValidityMsg: "checking email is unique...",
          emailStatus: "all-clear-field",
          emailErrored: "all-clear-statement",
        });
      }
    } else {
      this.setState({
        emailValidityMsg: "You need an email!",
        emailStatus: "error-field",
        emailErrored: "error-statement",
      });
    }
  },

  render: function () {
    return (
      <label
        className="text_box_item form_two_item email_input"
        onBlur={this.runValidation}
      >
        <p>Email</p>
        <input
          className={this.state.emailStatus}
          type="text"
          onChange={this.handleEmailChange}
          placeholder="eg. example@url.com"
        />

        <span className={"email-validity-msg " + this.state.emailErrored}>
          {this.state.emailValidityMsg}
        </span>

        <input
          className={this.state.emailStatus}
          type="text"
          onChange={this.handleDupEmailChange}
          placeholder="Confirmation email"
        />
      </label>
    );
  },
});

module.exports = EmailInput;
