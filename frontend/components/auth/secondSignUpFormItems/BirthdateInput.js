import React from "react";
import createClass from "create-react-class";
import PropTypes from "prop-types";

import AuthInfoStore from "../../../stores/authInfoStore";

var BirthdateInput = createClass({
  getInitialState: function () {
    return {
      birth_date: {
        mm: "",
        dd: "",
        yyyy: "",
      },
      bdErrored: "",
      bdStatus: "",
    };
  },

  handleDateChange: function (type, event) {
    event.preventDefault();
    var birth_date = this.state.birth_date;

    birth_date[type] = event.target.value;

    this.setState({
      birth_date: birth_date,
    });
  },

  runValidation: function () {
    var birth_date = this.state.birth_date;

    if (
      birth_date.mm.length === 0 ||
      birth_date.dd.length === 0 ||
      birth_date.yyyy.length === 0
    ) {
      this.setState({
        bdayValidityMsg: "You need to enter a birth date!",
        bdStatus: "error-field",
        bdErrored: "error-statement",
      });
      AuthInfoStore.bdayValid = false;
    } else if (
      birth_date.mm.length > 0 &&
      birth_date.dd.length > 0 &&
      birth_date.yyyy.length > 0
    ) {
      if (AuthInfoStore.birthdateIsValid(birth_date) === "tooYoung") {
        this.setState({
          bdayValidityMsg:
            "Too young to use this site! Go play a nintendo or beep boop on the Google",
          bdStatus: "error-field",
          bdErrored: "error-statement",
        });
        AuthInfoStore.bdayValid = false;
      } else if (AuthInfoStore.birthdateIsValid(birth_date) === "tooOld") {
        this.setState({
          bdayValidityMsg: "This seems...off",
          bdStatus: "error-field",
          bdErrored: "error-statement",
        });
        AuthInfoStore.bdayValid = false;
      } else if (
        AuthInfoStore.birthdateIsValid(birth_date) === "indecipherable"
      ) {
        this.setState({
          bdayValidityMsg: "Uh, are those ...numbers?",
          bdStatus: "error-field",
          bdErrored: "error-statement",
        });
        AuthInfoStore.bdayValid = false;
      } else {
        this.setState({
          bdayValidityMsg: "",
          bdStatus: "all-clear-field",
          bdErrored: "all-clear-statement",
        });
        AuthInfoStore.bdayValid = true;
        AuthInfoStore.addInfoPiece("birth_date", birth_date);
      }
    }
  },

  render: function () {
    return (
      <label
        className="birthdate_label text_box_item form_two_item"
        ref="birthdate_label"
        onBlur={this.runValidation}
      >
        <p>Birthdate</p>

        <input
          className={this.state.bdStatus}
          type="text"
          onChange={this.handleDateChange.bind(this, "mm")}
          placeholder="MM"
        />

        <input
          className={this.state.bdStatus}
          type="text"
          onChange={this.handleDateChange.bind(this, "dd")}
          placeholder="DD"
        />

        <input
          className={this.state.bdStatus}
          type="text"
          onChange={this.handleDateChange.bind(this, "yyyy")}
          placeholder="YYYY"
        />

        <span className={"birthday-validity-msg " + this.state.bdErrored}>
          {this.state.bdayValidityMsg}
        </span>
      </label>
    );
  },
});

export default BirthdateInput;
