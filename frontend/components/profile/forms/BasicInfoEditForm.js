import React from "react";
import createClass from "create-react-class";

import ClientActions from "../../../actions/clientActions";
import SessionStore from "../../../stores/sessionStore";
import HelperUtil from "../../../util/helperUtil";

var BasicInfoEditForm = createClass({
  getInitialState: function () {
    var currentUser = SessionStore.currentUser();
    return {
      username: currentUser.username,
      birth_date: "",
      country: currentUser.country,
      gender: currentUser.gender,
      location: currentUser.location,
      renderZipForm: false,
      errorText: "",
      new_birth_date: {},
    };
  },

  componentDidMount: function () {
    this.birthdayListener = SessionStore.addListener(
      function () {
        var birth_date = SessionStore.birthDay();
        this.setState({ birth_date: birth_date });
      }.bind(this)
    );

    ClientActions.getBirthday();
  },

  componentWillUnmount: function () {
    this.birthdayListener.remove();
  },
  //
  // handleUsernameChange: function (event) {
  //   this.setState({ username: event.target.value });
  // },

  handleGenderChange: function (event) {
    this.setState({ gender: event.target.value });
  },

  handleZipChange: function (event) {
    var zipStr = event.target.value.toString();
    var response;

    if (zipStr.length === 5) {
      ClientActions.lookUpZipCodeForModal(
        event.target.value,
        function (response) {
          response = JSON.parse(response);

          if (!response.places) {
            this.setState({ errorText: "Not a readable zip code!" });
          } else if (response.places[0]) {
            response = response.places[0];

            this.setState({
              location:
                response["place name"] + ", " + response["state abbreviation"],
              errorText:
                "Aah, " +
                response["place name"] +
                ", " +
                response["state abbreviation"] +
                "! Nice.",
            });
          } else {
            this.setState({ errorText: "Not a readable zip code!" });
          }
        }.bind(this)
      );
    }
  },

  handleSubmit: function (event) {
    event.preventDefault();

    var bdArray = this.state.birth_date.split("-"),
      bMonth = bdArray[1],
      bDay = bdArray[2],
      bYear = bdArray[0],
      new_birth_date = this.state.new_birth_date;

    if (!new_birth_date.dd) {
      new_birth_date["dd"] = bDay;
    }

    if (!new_birth_date.mm) {
      new_birth_date["mm"] = bMonth;
    }

    if (!new_birth_date.yyyy) {
      new_birth_date["yyyy"] = bYear;
    }

    var updatedUser = {
      username: this.state.username,
      birth_date: new_birth_date,
      country: this.state.country,
      gender: this.state.gender,
      location: this.state.location,
    };

    ClientActions.updateUser(
      updatedUser,
      function () {
        this.setState({ renderZipForm: false });
        this.props.closeModal();
      }.bind(this)
    );
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
          <option value={i + 1} key={i}>
            {property}
          </option>
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
      result.push(
        <option value={gender} key={index}>
          {gender}
        </option>
      );
    });

    return result;
  },

  renderDayRange: function (month) {
    var days =
      HelperUtil.birthdayList.months[HelperUtil.monthConvert[parseInt(month)]];
    var result = [];

    for (var i = 1; i < days; i++) {
      result.push(
        <option value={i} key={i - 1}>
          {i}
        </option>
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
      result.push(
        <option value={i} key={i - 1}>
          {i}
        </option>
      );
    }

    return result;
  },

  zipFormRender: function () {
    if (this.state.renderZipForm) {
      return (
        <input
          type="text"
          placeholder="Zip code"
          onChange={this.handleZipChange}
        ></input>
      );
    } else {
      return (
        <span>
          {this.state.location}
          <button className="edit-button" onClick={this.toggleZipFormRender}>
            edit
          </button>
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

  handleMonthChange: function (event) {
    event.preventDefault();

    var new_birth_date = this.state.new_birth_date;
    new_birth_date["mm"] = event.target.value;

    this.setState({
      new_birth_date: new_birth_date,
    });
  },

  handleDayChange: function (event) {
    event.preventDefault();

    var new_birth_date = this.state.new_birth_date;
    new_birth_date["dd"] = event.target.value;

    this.setState({
      new_birth_date: new_birth_date,
    });
  },

  handleYearChange: function (event) {
    event.preventDefault();

    var new_birth_date = this.state.new_birth_date;
    new_birth_date["yyyy"] = event.target.value;

    this.setState({
      new_birth_date: new_birth_date,
    });
  },

  render: function () {
    var currentUser = SessionStore.currentUser();

    if (this.state.birth_date) {
      var bdArray = this.state.birth_date.split("-"),
        bMonth = bdArray[1],
        bDay = bdArray[2],
        bYear = bdArray[0];

      return (
        <form className="info-edit-modal">
          <h1 className="edit-form-title">Your Basic Information</h1>
          {/*}
          <label>
            Username

            <input
              type='text'
              onChange=this.handleUsernameChange
              placeholder=currentUser.username
            />
          </label>
          */}
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
              className="dropdown"
              defaultValue={parseInt(bMonth)}
              onChange={this.handleMonthChange}
            >
              {this.renderMonthList(parseInt(bMonth))}
            </select>
            <select
              className="dropdown"
              defaultValue={parseInt(bDay)}
              onChange={this.handleDayChange}
            >
              {this.renderDayRange(bMonth)}
            </select>
            <select
              className="dropdown"
              defaultValue={parseInt(bYear)}
              onChange={this.handleYearChange}
            >
              {this.renderYearRange()}
            </select>
          </label>

          <label>
            Country
            <select className="dropdown">
              <option value="America">America</option>
              <option value="Somewhere Else">Somewhere Else</option>
            </select>
          </label>

          {this.zipFormRender()}

          <p>{this.state.errorText}</p>

          <button
            id="continue_button"
            className="save-button"
            onClick={this.handleSubmit}
          >
            Save
          </button>

          <button
            id="continue_button"
            className="save-button"
            onClick={this.handleCancel}
          >
            Cancel
          </button>
        </form>
      );
    } else {
      return <div />;
    }
  },
});

export default BasicInfoEditForm;
