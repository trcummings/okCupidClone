import React from "react";
import createClass from "create-react-class";
import PropTypes from "prop-types";

import ClientActions from "../actions/clientActions";

var HeaderProfileDropDown = createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
  },

  handleLogOut: function (event) {
    event.preventDefault();

    ClientActions.logout(
      function () {
        this.context.router.push("/");
      }.bind(this)
    );
  },

  redirectToProfile: function () {
    this.context.router.push("/profile");
  },

  render: function () {
    return (
      <ul className="header-profile-options">
        <i className="fa fa-caret-up" aria-hidden="true"></i>
        <li>
          <button onClick={this.redirectToProfile}>Profile</button>
        </li>

        <li>
          <button onClick={this.handleLogOut} className="log-out-button">
            Log Out
          </button>
        </li>
      </ul>
    );
  },
});

export default HeaderProfileDropDown;
