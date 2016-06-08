var React = require('react'),
    SessionStore = require('../../../stores/sessionStore'),
    HelperUtil = require('../../../util/helperUtil'),
    ClientActions = require('../../../actions/clientActions');

var BasicInfoEditForm = React.createClass({
  getInitialState: function () {
    var currentUser = SessionStore.currentUser();
    return ({
      username: currentUser.username,
      birth_date: '',
      country: currentUser.country,
      gender: currentUser.gender,
      location: currentUser.location,
      renderZipForm: false
    });
  },

  componentDidMount: function () {
    this.birthdayListener = SessionStore.addListener(function () {
      var birth_date = SessionStore.birthDay();
      this.setState({ birth_date: birth_date });
    }.bind(this));

    ClientActions.getBirthday();
  },

  componentWillUnmount: function () {
    this.birthdayListener.remove();
  },

  handleUsernameChange: function (event) {
    this.setState({ username: event.target.value });
  },

  handleGenderChange: function (event) {
    this.setState({ gender: event.target.value });
  },

  handleZipChange: function (event) {
    //
  },

  handleSubmit: function (event) {
    event.preventDefault();

    console.log("tried to submipbt");
    // ClientActions.updateUser(this.state);
  },

  handleCancel: function (event) {
    event.preventDefault();

    this.props.closeModal();
  },

  renderMonthList: function () {
    var months = HelperUtil.birthdayList.months;
    var result = [];
    var i = 0;

    for (var property in months) {
      if (months.hasOwnProperty(property)) {
        result.push(
          <option value={property} key={i}>{property}</option>
        );
        i++;
      }
    }

    return result;
  },

  renderGenderList: function () {
    var genders = HelperUtil.possibleGenders.genders;
    var result = [];

    genders.map(function (gender, index) {
      result.push (
        <option value={gender} key={index}>{gender}</option>
      );
    });

    return result;
  },

  renderDayRange: function (month) {
    var days = HelperUtil.birthdayList.months[HelperUtil.monthConvert[month]];
    var result = [];

    for (var i = 1; i < days; i++) {
      result.push (
        <option value={i} key={i-1}>{i}</option>
      );
    }

    return result;
  },

  renderYearRange: function () {
    var thisYear = new Date();
    thisYear = thisYear.getFullYear();
    var minYear = thisYear - 18;
    var maxYear = thisYear - 99;
    var result = [];


    for (var i = minYear; i > maxYear; i--) {
      result.push (
        <option value={i} key={i-1}>{i}</option>
      );
    }

    return result;
  },

  zipFormRender: function () {

    if (this.state.renderZipForm) {
      return (
        <input
          type='text'
          placeholder='Zip code'
          onChange={this.handleZipChange}
          >
        </input>
      );
    } else {
      return (
        <span>
          {this.state.location}
          <button onClick={this.toggleZipFormRender}>edit</button>
        </span>
      );
    }
  },

  toggleZipFormRender: function () {
    if (this.state.renderZipForm) {
      this.setState({ renderZipForm: false });
    } else {
      this.setState({ renderZipForm: true });
    }
  },

  render: function() {
    var currentUser = SessionStore.currentUser();

    if (this.state.birth_date) {

      var bdArray = this.state.birth_date.split('-'),
          bMonth = bdArray[1];
          bDay = bdArray[2];
          bYear = bdArray[0];

      return (
        <form className=''>
          <p className='edit-form-title'>
            Your Basic Information
          </p>

          <label>
            Username

            <input
              type='text'
              onChange={this.handleUsernameChange}
              placeholder={currentUser.username}
            />
          </label>

          <label onBlur={this.handleGenderChange}>
            I am a
            <select
              className="dropdown gender"
              onChange={this.handleGenderChange}
              defaultValue={currentUser.gender}
            >
              {this.renderGenderList()}
            </select>
          </label>

          <label>
            My Birthday
            <select
              className='dropdown'
              defaultValue={HelperUtil.monthConvert[bMonth]}
            >
              {this.renderMonthList(bMonth)}
            </select>

            <select
              className='dropdown'
              defaultValue={parseInt(bDay)}
            >
              {this.renderDayRange(bMonth)}
            </select>

            <select
              className='dropdown'
              defaultValue={parseInt(bYear)}
            >
              {this.renderYearRange()}
            </select>
          </label>

          <label>
            Country
            <select className='dropdown'>
              <option value="America">America</option>
              <option value="Somewhere Else">Somewhere Else</option>
            </select>
          </label>

          {this.zipFormRender()}


          <button
            id='continue_button'
            className='save-button'
            onClick={this.handleSubmit}
            >
            Save
          </button>

          <button
            id='continue_button'
            className='save-button'
            onClick={this.handleCancel}
            >
            Cancel
          </button>
        </form>
      );
    } else {
      return (<div />);
    }
  }

});

module.exports = BasicInfoEditForm;
