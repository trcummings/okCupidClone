var React = require('react');
var ClientActions = require('../../actions/clientActions');
var HelperUtil = require('../../util/helperUtil');
var AuthInfoStore = require('../../stores/authInfoStore');
var ErrorStore = require('../../stores/errorStore');
var BirthdateInput = require('./secondSignUpFormItems/birthdateInput');

var SecondSignUpForm = React.createClass({
  getInitialState: function () {
    this.submitStateDisabled = false;

    return ({
      birth_date: {
        mm: "",
        dd: "",
        yyyy: ""
      },
      country: "America",
      zipErrored: "",
      emailErrored: "",
      zipStatus: "",
      emailStatus: ""
    });
  },

  componentDidMount: function () {

  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  onStateChange: function () {
    if (this.emailValid && AuthInfoStore.bdayValid && this.zipCodeValid) {
      this.submitStateDisabled = false;
    }
  },

  handleZipCodeChange: function (event) {
    event.preventDefault();

    this.state['zip_code'] = event.target.value;
    this.setState(this.state);
  },

  handleSubmit: function () {
    if (this.emailValid && this.bdayValid && this.zipCodeValid) {
      AuthInfoStore.addInfoPiece('country', this.state.country);
      ClientActions.incrementAuthState();
    }
  },

  zipCodeValidation: function (event) {
    var zip = parseInt(event.target.value);
    var zipArray = (event.target.value).split("");

    var location = "";
    if (event.target.value === "") {
      this.setState({
        zipCodeValidityMsg: "You need a zip code!",
        zipStatus: 'error-field',
        zipErrored: 'error-statement'
      });
    } else if (isNaN(zip)) {
      this.setState({
        zipCodeValidityMsg: "That aint no zip code I've ever heard of.",
        zipStatus: 'error-field',
        zipErrored: 'error-statement'
       });
    } else if (zipArray.length === 5) {
      ClientActions.lookUpZipCode(event.target.value);
      this.listener = AuthInfoStore.addListener(function () {
        this.zipCodeValid = true;
        this.setState({
          zipCodeValidityMsg: "aah, "  + AuthInfoStore.zipLocation(),
          zipStatus: 'all-clear-field',
          zipErrored: 'all-clear-statement'
         });
        // zip code match success
      }.bind(this));
    } else {
      this.setState({
        zipCodeValidityMsg: "...",
        zipStatus: 'error-field',
        zipErrored: 'error-statement'
       });
    }
  },

  handleCountryChange: function (event) {
    AuthInfoStore.addInfoPiece('country', event.target.value);
    this.setState({ country: event.target.value });
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
        this.emailValid = true;
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

  handlePrematureClick: function (event) {
    event.preventDefault();

    if (!(this.emailValid && this.bdayValid && this.zipCodeValid)) {
      this.zipCodeValidation(event);
      this.emailValidation(event);
      this.birthdateValidation(event);
    } else {
      this.handleSubmit();
    }
  },

  render: function () {
    return (
      <div className='authForm'>
        <h1> Almost There! </h1>
        <form onSubmit={this.handleSubmit}>
          <BirthdateInput className="row group"/>

          <div className="row group">
            <label
              className="country form_two_item"
              onBlur={this.handleCountryChange}
            >
              Country
              <select onChange={this.handleCountryChange}>
                <option value="America">America</option>
                <option value="Who Cares">Somewhere Else</option>
              </select>
            </label>
          </div>

          <div className="row group">
            <label className="zip_code_label text_box_item form_two_item" onBlur={this.zipCodeValidation}>
              Zip Code
              <input
                className={this.state.zipStatus}
                type="text"
                onChange={this.handleZipCodeChange}
                placeholder="eg. 10001"
              />
            </label>

            <span className={'zip-code-validity-msg ' + this.state.zipErrored}>
              {this.state.zipCodeValidityMsg}
            </span>
          </div>

          <div className="row group">
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
            </label>
            <span className={"email-validity-msg " + this.state.emailErrored}>
              {this.state.emailValidityMsg}
            </span>
          </div>

          <div className="row group">
            <button
              id="continue_button"
              type="submit"
              className="flatbutton green form_two_item"
              disabled={this.submitStateDisabled}
              onClick={this.handlePrematureClick}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = SecondSignUpForm;
