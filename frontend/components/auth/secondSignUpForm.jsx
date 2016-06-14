var React = require('react');
var ClientActions = require('../../actions/clientActions');
var HelperUtil = require('../../util/helperUtil');
var AuthInfoStore = require('../../stores/authInfoStore');
var ErrorStore = require('../../stores/errorStore');
var BirthdateInput = require('./secondSignUpFormItems/birthdateInput');
var ZipCodeInput = require('./secondSignUpFormItems/zipCodeInput');
var EmailInput = require('./secondSignUpFormItems/emailInput');

var SecondSignUpForm = React.createClass({
  getInitialState: function () {
    return ({
      country: "America",
      submitStateDisabled: false
    });
  },

  handleSubmit: function (event) {
    event.preventDefault();

    if (AuthInfoStore.emailValid && AuthInfoStore.bdayValid && AuthInfoStore.zipCodeValid) {
      this.setState({ submitStateDisabled: false });
      AuthInfoStore.addInfoPiece('country', this.state.country);
      ClientActions.incrementAuthState();
    } else {
      this.setState({ submitStateDisabled: true });
    }
  },

  handleCountryChange: function (event) {
    AuthInfoStore.addInfoPiece('country', event.target.value);
    this.setState({ country: event.target.value });
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

          <ZipCodeInput className="row group"/>

          <EmailInput className="row group"/>

          <div className="row group">
            <button
              id="continue_button"
              className="flatbutton green form_two_item"
              disabled={this.state.submitStateDisabled}
              onClick={this.handleSubmit}
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
