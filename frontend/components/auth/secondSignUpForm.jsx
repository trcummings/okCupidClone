var React = require('react');
var ClientActions = require('../../actions/clientActions');
var HelperUtil = require('../../util/helperUtil');
var AuthInfoStore = require('../../stores/authInfoStore');

var SecondSignUpForm = React.createClass({
  getInitialState: function () {
    return ({
      birth_date: {
        mm: "",
        dd: "",
        yyyy: ""
      },
      country: "America"
    });
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

  handleZipCodeChange: function (event) {
    event.preventDefault();

    this.state['zip_code'] = event.target.value;
    this.setState(this.state);
  },

  handleSubmit: function () {
    if (this.emailValid && this.bdayValid && this.zipCodeValid) {
      ClientActions.incrementAuthState();
    } else {
      alert("fuck you");
    }
  },

  birthdateValidation: function (event) {
    var birth_date = this.state.birth_date;

    if (
      birth_date.mm.length > 0 &&
      birth_date.dd.length > 0 &&
      birth_date.yyyy.length > 0
    ) {
      if (AuthInfoStore.birthdateIsValid(birth_date) === 'tooYoung') {
        this.setState({ bdayValidityMsg: "Too young to use this site! Go play a nintendo or beep boop on the Google" });
      } else if (AuthInfoStore.birthdateIsValid(birth_date) === 'tooOld') {
        this.setState({ bdayValidityMsg: "This seems...off" });
      } else if (AuthInfoStore.birthdateIsValid(birth_date) === 'indecipherable') {
        this.setState({ bdayValidityMsg: "Uh, are those ...numbers?" });
      }
    } else {
      this.setState({ bdayValidityMsg: "" });
      this.bdayValid = true;
      AuthInfoStore.addInfoPiece('birth_date', birth_date);
    }
  },

  zipCodeValidation: function (event) {
    var zip = parseInt(event.target.value);
    var location = "";

    if (isNaN(zip)) {
      this.setState({ zipCodeValidityMsg: "That aint no zip code I've ever heard of." });
    } else if (event.target.value.length === 5) {
      ClientActions.lookUpZipCode(zip);
      this.listener = AuthInfoStore.addListener(function () {
        this.zipCodeValid = true;
        this.setState({ zipCodeValidityMsg: "aah, "  + AuthInfoStore.zipLocation() });
        // zip code match success
      }.bind(this));
    } else {
      this.setState({ zipCodeValidityMsg: "..." });
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
        this.setState({ emailValidityMsg: "" });
        this.emailValid = true;
        // email match success
      } else {
        this.setState({ emailValidityMsg: "Emails don't match!" });
      }
    }
  },

  render: function () {
    return (
      <div className='authForm'>
        <h1> Almost There! </h1>
        <form onSubmit={this.handleSubmit}>
          <label
            className="birthdate_label"
            ref='birthdate_label'
            onBlur={this.birthdateValidation}
            >
            Birthdate
            <input
              type='text'
              onChange={this.handleDateChange.bind(this, 'mm')}
            />

            <input
              type='text'
              onChange={this.handleDateChange.bind(this, 'dd')}
            />

            <input
              type='text'
              onChange={this.handleDateChange.bind(this, 'yyyy')}
            />

          </label><br />
          <span className="birthday-validity-msg">
            {this.state.bdayValidityMsg}
          </span><br />

          <label className="country" onBlur={this.handleCountryChange}>
            Country
            <select onChange={this.handleCountryChange}>
              <option value="America">America</option>
              <option value="Who Cares">Somewhere Else</option>
            </select>
          </label><br />

          <label className="zip_code_label" onBlur={this.zipCodeValidation}>
            Zip Code
            <input type="text" onChange={this.handleZipCodeChange} />

          </label><br />
          <span className="zip-code-validity-msg">
            {this.state.zipCodeValidityMsg}
          </span><br />

          <label onBlur={this.emailValidation}>
            Email
            <input type="text" onChange={this.handleEmailChange}/>
            <input type="text" onChange={this.handleDupEmailChange}/>
          </label><br />
          <span className="email-validity-msg">
            {this.state.emailValidityMsg}
          </span><br />

          <button type="submit" className='next-button'>Next</button>
        </form>
      </div>
    );
  }
});

module.exports = SecondSignUpForm;
