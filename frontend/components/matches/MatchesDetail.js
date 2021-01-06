import React from "react";
import createClass from "create-react-class";
import PropTypes from "prop-types";
import Modal from "react-modal";

import MatchPhotoModal from "./MatchPhotoModal";
import MessageButton from "../messages/MessageButton";
import LikeToggle from "../widgetButtons/LikeToggle";

import ClientActions from "../../actions/clientActions";
import UserStore from "../../stores/userStore";
import PhotoStore from "../../stores/photoStore";
import SessionStore from "../../stores/sessionStore";

var modalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.60)",
    zIndex: 1000000,
  },
  content: {
    align: "center",
    display: "block",
    position: "relative",
    width: "500px",
    top: "80px",
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "#fff",
    fontSize: "14px",
    border: "0px solid #fff",
    textAlign: "center",
    margin: "auto",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    outline: "none",
  },
};

var MatchDetail = createClass({
  getInitialState: function () {
    Modal.setAppElement(document.body);

    return {
      viewedUser: UserStore.viewedUser(),
      theirPhotos: PhotoStore.otherUserAllPhotos(),
      modalOpen: false,
    };
  },

  closeModal: function () {
    this.setState({ modalOpen: false });
  },

  openModal: function () {
    if (this.state.theirPhotos.length > 0) {
      this.setState({ modalOpen: true });
    }
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(
      function () {
        this.setState({ viewedUser: UserStore.viewedUser() });
      }.bind(this)
    );

    this.photoListener = PhotoStore.addListener(
      function () {
        this.setState({ theirPhotos: PhotoStore.otherUserAllPhotos() });
      }.bind(this)
    );

    var thisUserUsername = this.props.routeParams.username;

    ClientActions.fetchSingleUser(thisUserUsername);
    ClientActions.getOtherUserPics(thisUserUsername);
    ClientActions.getOtherUserAbout(thisUserUsername);
  },

  componentWillUnmount: function () {
    this.userListener.remove();
    this.photoListener.remove();
  },

  renderEachSection: function () {
    var aboutDetail = this.state.viewedUser.about;

    var fieldList = [
      "My Self Summary",
      "What I’m doing with my life",
      "I’m really good at",
      "Favorite books, movies, shows, music, and food",
      "The six things I could never do without",
      "I spend a lot of time thinking about",
      "On a typical Friday night I am",
      "You should message me if",
    ];
    var result = [];
    var i = 0;

    if (aboutDetail) {
      for (var property in aboutDetail) {
        if (aboutDetail.hasOwnProperty(property)) {
          result.push(
            <li key={i} className="profile-detail-section group">
              <p className="about-title">{fieldList[i]}</p>
              <p className="info-box">{aboutDetail[property]}</p>
            </li>
          );
          i++;
        }
      }

      return result;
    } else {
      return <div />;
    }
  },

  render: function () {
    var profilePhoto;
    var thisUser = this.state.viewedUser;
    if (thisUser.default_photo_url) {
      profilePhoto = thisUser.default_photo_url;
    } else {
      profilePhoto = window.anon;
    }

    if (thisUser.username) {
      return (
        <div id="viewed-user-profile-main" className="group">
          <article id="viewed-user-header" className="group">
            <div id="viewed-user-content" className="group">
              <div id="viewed-user-thumbs">
                <img
                  onClick={this.openModal}
                  src={profilePhoto}
                  alt={"A picture of" + thisUser.username}
                />
              </div>

              <Modal
                isOpen={this.state.modalOpen}
                onRequestClose={this.closeModal}
                style={modalStyle}
                ref="popup"
              >
                <MatchPhotoModal photos={this.state.theirPhotos} />
              </Modal>

              <div id="basic-information">
                <h1 id="user-name">{thisUser.username}</h1>
                <ul id="basic-information">
                  <li>{thisUser.age}</li>
                  <li>{thisUser.location}</li>
                </ul>
              </div>

              <article id="widget-buttons" className="group">
                <LikeToggle
                  likee={thisUser}
                  liker={SessionStore.currentUser()}
                />
                <MessageButton targetUser={thisUser} />
              </article>
            </div>
          </article>

          <div id="rest-of-match-detail" className="group">
            <section id="left-column">
              <ul>{this.renderEachSection()}</ul>
            </section>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  },
});

export default MatchDetail;
