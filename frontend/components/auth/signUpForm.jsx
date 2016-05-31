var React = require('react');
var SignUpActions = require('../../actions/signUpActions');
var HelperUtil = require('../../util/helperUtil');

var SignUpForm = React.createClass({
  getInitialState: function () {
    return ({
      birth_date: {
        mm: "",
        dd: "",
        yyyy: ""
      }
    });
  },

  componentDidMount: function () {
    // window.__myapp_container.addEventListener('click', this.handleDocumentClick);
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

  // handleDocumentClick: function (event) {
  //   var area = ReactDOM.findDOMNode(this.refs.area);
  //
  //   if (!area.contains(evt.target)) {
  //     this.props.onClickOutside(evt);
  //   }
  // },

  handleSubmit: function () {
    ReactDOM.findDOMNode(this.refs.birthdate_label);
  },

  birthdateValidation: function (event) {
    event.stopPropagation();
    
    debugger;
  },

  zipCodeValidation: function (event) {

  },

  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label
          className="birthdate_label"
          ref='birthdate_label'
          onBlur={this.birthdateValidation}
          >
          Birthdate
          <input type='text' onChange={this.handleDateChange.bind(this, 'mm')}/>
          <input type='text' onChange={this.handleDateChange.bind(this, 'dd')}/>
          <input type='text' onChange={this.handleDateChange.bind(this, 'yyyy')}/>
        </label><br />

        <label className="country">
          Country
          <select name="cat[coat_color]" id="cat_coat_color">
            <option value="America">America</option>
            <option value="Who Cares">Somewhere Else</option>
          </select>
        </label><br />

        <label className="zip_code_label" onBlur={this.zipCodeValidation}>
          Zip Code
          <input type="text" onChange={this.handleZipCodeChange} />
        </label><br />

        <label>
          Email
          <input type="text" />
          <input type="text" />
        </label><br />
      </form>
    );
  }
});

module.exports = SignUpForm;
