var React = require('react');
var PropTypes = React.PropTypes;
var AuthInfoStore = require('../../../stores/authInfoStore');
var ClientActions = require('../../../actions/clientActions');

var ZipCodeInput = React.createClass({
  getInitialState: function () {
    return ({
      zipErrored: "",
      zipStatus: ""
    });
  },

  handleZipCodeChange: function (event) {
    event.preventDefault();

    this.state['zip_code'] = event.target.value;
    this.setState(this.state);
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
        AuthInfoStore.zipCodeValid = true;
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

  render: function() {
    return (
      <label className="zip_code_label text_box_item form_two_item" onBlur={this.zipCodeValidation}>
        Zip Code
        <input
          className={this.state.zipStatus}
          type="text"
          onChange={this.handleZipCodeChange}
          placeholder="eg. 10001"
        />

        <span className={'zip-code-validity-msg ' + this.state.zipErrored}>
          {this.state.zipCodeValidityMsg}
        </span>
      </label>

    );
  }

});

module.exports = ZipCodeInput;
