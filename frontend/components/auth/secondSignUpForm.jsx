var React = require('react');
var ClientActions = require('../../actions/clientActions');
var HelperUtil = require('../../util/helperUtil');
var AuthInfoStore = require('../../stores/authInfoStore');
var ErrorStore = require('../../stores/errorStore');

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
      bdErrored: "",
      emailErrored: "",
      zipStatus: "",
      bdStatus: "",
      emailStatus: ""
    });
  },

  componentDidMount: function () {

  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  handleDateChange: function (type, event) {
    event.preventDefault();
    var birth_date = this.state.birth_date;

    birth_date[type] = event.target.value;

    this.setState({
      birth_date: birth_date
    });
  },

  onStateChange: function () {
    if (this.emailValid && this.bdayValid && this.zipCodeValid) {
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

  birthdateValidation: function () {
    var birth_date = this.state.birth_date;

    if (
      birth_date.mm.length === 0 ||
      birth_date.dd.length === 0 ||
      birth_date.yyyy.length === 0
    ) {
      this.setState({
        bdayValidityMsg: "You need to enter a birth date!",
        bdStatus: 'error-field',
        bdErrored: 'error-statement'
       });
      this.bdayValid = false;
    } else if (
      birth_date.mm.length > 0 &&
      birth_date.dd.length > 0 &&
      birth_date.yyyy.length > 0
    ) {
      if (AuthInfoStore.birthdateIsValid(birth_date) === 'tooYoung') {
        this.setState({
          bdayValidityMsg: "Too young to use this site! Go play a nintendo or beep boop on the Google",
          bdStatus: 'error-field',
          bdErrored: 'error-statement'
         });
        this.bdayValid = false;
      } else if (AuthInfoStore.birthdateIsValid(birth_date) === 'tooOld') {
        this.setState({
          bdayValidityMsg: "This seems...off",
          bdStatus: 'error-field',
          bdErrored: 'error-statement'
         });
        this.bdayValid = false;
      } else if (AuthInfoStore.birthdateIsValid(birth_date) === 'indecipherable') {
        this.setState({
          bdayValidityMsg: "Uh, are those ...numbers?",
          bdStatus: 'error-field',
          bdErrored: 'error-statement'
         });
        this.bdayValid = false;
      } else {
        this.setState({
          bdayValidityMsg: "",
          bdStatus: 'all-clear-field',
          bdErrored: 'all-clear-statement'
         });
        this.bdayValid = true;
        AuthInfoStore.addInfoPiece('birth_date', birth_date);
      }
    }
  },

// } else if {
//   this.setState({ bdayValidityMsg: "You need to enter a birth date!" });
// }
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
          <div className="row group">
            <label
              className="birthdate_label text_box_item form_two_item"
              ref='birthdate_label'
              onBlur={this.birthdateValidation}
            >
              Birthdate

              <input
                className={this.state.bdStatus}
                type='text'
                onChange={this.handleDateChange.bind(this, 'mm')}
                placeholder="MM"
              />

              <input
                className={this.state.bdStatus}
                type='text'
                onChange={this.handleDateChange.bind(this, 'dd')}
                placeholder="DD"
              />

              <input
                className={this.state.bdStatus}
                type='text'
                onChange={this.handleDateChange.bind(this, 'yyyy')}
                placeholder="YYYY"
              />

            </label>

            <span className={"birthday-validity-msg " + this.state.bdErrored}>
              {this.state.bdayValidityMsg}
            </span>
          </div>

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
