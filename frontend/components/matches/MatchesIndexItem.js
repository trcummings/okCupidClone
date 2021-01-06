import React from "react";
import createClass from "create-react-class";
import PropTypes from "prop-types";

import LikeToggle from "../widgetButtons/LikeToggle";

import ClientActions from "../../actions/clientActions";
import SessionStore from "../../stores/sessionStore";
import PhotoStore from "../../stores/photoStore";
import HelperUtil from "../../util/helperUtil";

var MatchesIndexItem = createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
  },

  renderMatchDetail: function (event) {
    if (
      event.target.id !== "like-toggle" &&
      event.target.id !== "toggle-button" &&
      event.target.className !== "fa fa-star"
    ) {
      this.context.router.push("/profile/" + this.props.user.username);
    }
  },

  renderProfilePhoto: function () {
    var user = this.props.user;
    var profilePhoto;

    if (user.default_photo_url) {
      profilePhoto = user.default_photo_url;
    } else {
      profilePhoto = window.anon;
    }

    return <img src={profilePhoto} alt={"Photo of " + user.username} />;
  },

  render: function () {
    var user = this.props.user;
    var matchPercent = parseInt(user.match_percentage);
    if (isNaN(matchPercent)) {
      matchPercent = 0;
    }

    return (
      <div id="match-card" className="group" onClick={this.renderMatchDetail}>
        <div id="match-pic scaling-image">{this.renderProfilePhoto()}</div>

        <div id="match-info-container" className="group">
          <h1 id="match-username">{user.username}</h1>
          <ul id="match-info">
            <li>{user.age}</li>
            <li>{user.location}</li>
            <li className="match-card-percent">{matchPercent + " % Match"}</li>
          </ul>

          <div id="toggle-button" className="on-match-page">
            <LikeToggle
              ref="like-toggle"
              liker={SessionStore.currentUser()}
              likee={user}
            />
          </div>
        </div>
      </div>
    );
  },
});

export default MatchesIndexItem;
