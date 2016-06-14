var React = require('react');
var PropTypes = React.PropTypes;
var AuthInfoStore = require('../../../stores/authInfoStore');


var EmailInput = React.createClass({
  getInitialState: function () {
    return ({
      emailErrored: "",
      emailStatus: ""
    });
  },

  handleEmailChange: function (event) {
    this.setState({ email: event.target.value });
  },

  handleDupEmailChange: function (event) {
    this.setState({ dupEmail: event.target.value });
  },

  emailValidation: function () {
    if (this.state.email && this.state.dupEmail) {
      if (this.state.email === this.state.dupEmail) {
        AuthInfoStore.addInfoPiece('email', this.state.email);
        this.setState({
          emailValidityMsg: "",
          emailStatus: 'all-clear-field',
          emailErrored: 'all-clear-statement'
        });
        AuthInfoStore.emailValid = true;
        // email match success
      } else {
        this.setState({
          emailValidityMsg: "Emails don't match!",
          emailStatus: 'error-field',
          emailErrored: 'error-statement'
         });
      }
    } else {
      this.setState({
        emailValidityMsg: "You need an email!",
        emailStatus: 'error-field',
        emailErrored: 'error-statement'
       });
    }
  },

  render: function() {
    return (
      <label className="text_box_item form_two_item" onBlur={this.emailValidation}>
        Email
        <input
          className={this.state.emailStatus}
          type="text" onChange={this.handleEmailChange}
          placeholder="eg. example@url.com"
        />
        <input
          className={this.state.emailStatus}
          type="text"
          onChange={this.handleDupEmailChange}
          placeholder="Confirmation email"
          />

        <span className={"email-validity-msg " + this.state.emailErrored}>
          {this.state.emailValidityMsg}
        </span>
      </label>
    );
  }

});

module.exports = EmailInput;
