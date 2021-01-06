import React from "react";
import createClass from "create-react-class";
import PropTypes from "prop-types";

import BasicInfoEditModal from "./modals/BasicInfoEditModal";
import ProfileAboutTab from "./ProfileAboutTab";
import ProfileQuestionsTab from "./ProfileQuestionsTab";
import ProfilePicturesTab from "./ProfilePicturesTab";

import ClientActions from "../../actions/clientActions";
import SessionStore from "../../stores/sessionStore";
import PhotoStore from "../../stores/photoStore";
import HelperUtil from "../../util/helperUtil";

var Tabs = {
  0: function () {
    return <ProfileAboutTab />;
  },
  1: function () {
    return <ProfilePicturesTab />;
  },
  2: function () {
    return <ProfileQuestionsTab />;
  },
};

var ProfileMain = createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
  },

  getInitialState: function () {
    return {
      selectedTab: 0,
      userPhotos: PhotoStore.returnDefaultProfilePic(),
      tabOneSelected: "selectedTab",
      tabTwoSelected: "",
      tabThreeSelected: "",
    };
  },

  componentDidMount: function () {
    this.photoListener = PhotoStore.addListener(
      function () {
        this.setState({
          userPhotos: PhotoStore.returnDefaultProfilePic().photo_url,
        });
      }.bind(this)
    );

    this.userListener = SessionStore.addListener(
      function () {
        this.forceUpdate();
      }.bind(this)
    );

    ClientActions.getCurrentUserPhotos();
    ClientActions.getBirthday();
  },

  componentWillUnmount: function () {
    this.photoListener.remove();
    this.userListener.remove();
  },

  selectTab: function (event) {
    event.preventDefault();

    if (event.target.value === 0) {
      this.setState({
        selectedTab: event.target.value,
        tabOneSelected: "selectedTab",
        tabTwoSelected: "",
        tabThreeSelected: "",
      });
    } else if (event.target.value === 1) {
      this.setState({
        selectedTab: event.target.value,
        tabOneSelected: "",
        tabTwoSelected: "selectedTab",
        tabThreeSelected: "",
      });
    } else if (event.target.value === 2) {
      this.setState({
        selectedTab: event.target.value,
        tabOneSelected: "",
        tabTwoSelected: "",
        tabThreeSelected: "selectedTab",
      });
    }
  },

  renderTab: function () {
    return Tabs[this.state.selectedTab]();
  },

  addPhotoToForm: function (event) {
    var reader = new FileReader();
    var file = event.target.files[0];
    var formData = new FormData();

    reader.onloadend = function () {
      ClientActions.uploadImage(formData, this.resetForm);
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
      formData.append("photo[image]", file);
    }
  },

  render: function () {
    var currentUserPhotos = PhotoStore.returnDefaultProfilePic();
    var currentUser = SessionStore.currentUser();
    var defaultPhotoSrc = window.anon;

    var photoFunction = function (currentUserPhotos, currentUser) {
      if (currentUserPhotos.length === 0) {
        return (
          <img
            className="first-user-photo"
            src={defaultPhotoSrc}
            alt={"Photo of " + currentUser.username}
          />
        );
      } else {
        return (
          <img
            className="first-user-photo"
            src={PhotoStore.returnDefaultProfilePic().photo_url}
            alt={"Photo of " + currentUser.username}
          />
        );
      }
    };

    if (currentUser) {
      return (
        <div id="profile-main" className="group">
          <div id="tabbed-heading">
            <div id="profile-thumbs" className="group">
              {photoFunction(currentUserPhotos, currentUser)}
              <form id="add-photo-button">
                <label>
                  Add Photo
                  <input
                    type="file"
                    name="user_photo[image_url]"
                    onChange={this.addPhotoToForm}
                  />
                </label>
              </form>
            </div>

            <ul className="page-tabs">
              <li
                value={0}
                onClick={this.selectTab}
                id={this.state.tabOneSelected}
              >
                About
              </li>

              <li
                value={1}
                onClick={this.selectTab}
                id={this.state.tabTwoSelected}
              >
                Photos
              </li>

              <li
                value={2}
                onClick={this.selectTab}
                id={this.state.tabThreeSelected}
              >
                Questions
              </li>
            </ul>

            <BasicInfoEditModal user={currentUser} />
          </div>

          <div className="profile-monolith">
            <div id="main-column">{this.renderTab()}</div>
          </div>
        </div>
      );
    } else {
      return <div>scoobert doobert! you shouldn't be here!</div>;
    }
  },
});

export default ProfileMain;
