import React from "react";
import createClass from "create-react-class";
import PropTypes from "prop-types";

import SessionStore from "../../stores/sessionStore";
import ClientActions from "../../actions/clientActions";
import HelperUtil from "../../util/helperUtil";

var Tabs = {
  0: {
    aboutText: "About Who Likes You",
    aboutBody:
      "These are people who like you on PerfectPair’s site. Maybe they could like you in real life too!",
    group: "likers",
  },
  1: {
    aboutText: "About Mutual Likes",
    aboutBody:
      "These people like you back but you're sitting here reading this, and NOT messaging them? C'mon!",
    group: "mutual_likes",
  },
  2: {
    aboutText: "About Who You Like",
    aboutBody:
      "These are people you’ve liked on PerfectPair’s site. Be bold, send them a message, or don't. Not my problem!",
    group: "likees",
  },
};

var LikesMain = createClass({
  contextTypes: {
    router: PropTypes.object.isRequired,
  },

  getInitialState: function () {
    return {
      selectedTab: 0,
      tabOneSelected: "selectedTab",
      tabTwoSelected: "",
      tabThreeSelected: "",
      currentUser: SessionStore.currentUser(),
    };
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

  getTabData: function () {
    return Tabs[this.state.selectedTab];
  },

  renderUserList: function () {
    var currentUser = SessionStore.currentUser();
    var tabData = this.getTabData();

    return (
      <ul>
        {currentUser[tabData.group].map(
          function (user, index) {
            return (
              <li className="likelist-user" key={index}>
                {this.renderUserItem(user)}
              </li>
            );
          }.bind(this)
        )}
      </ul>
    );
  },

  renderUserItem: function (user) {
    var thumbnailImage;
    if (user.default_photo_url) {
      thumbnailImage = user.default_photo_url;
    } else {
      thumbnailImage = window.anon;
    }

    return (
      <div
        className="user-item group"
        onClick={this.handleUserItemClick.bind(null, user.username)}
      >
        <section className="user-item-thumbnail">
          <img src={thumbnailImage} />
        </section>

        <section className="user-item-details">
          <h4>{user.username}</h4>

          <h5>{user.age}</h5>
          <p>{user.location}</p>
          <p>{parseInt(user.match_percentage) + "% match"}</p>
        </section>
      </div>
    );
  },

  handleUserItemClick: function (username) {
    this.context.router.push("/profile/" + username);
  },

  setSelectedTabToZero: function () {
    this.setState({
      selectedTab: 0,
      tabOneSelected: "selectedTab",
      tabTwoSelected: "",
      tabThreeSelected: "",
    });
  },

  renderGeneralTab: function () {
    var tabData = this.getTabData();
    var currentUser = this.state.currentUser;
    var personText = " people like you";

    if (currentUser.likers.length === 1) {
      personText = " person likes you";
    }

    return (
      <div className="user-list-box">
        <ul className="user-list-section-left">{this.renderUserList()}</ul>

        <section
          className="user-list-like-count"
          onClick={this.setSelectedTabToZero}
        >
          <i className="fa fa-star fa-2" aria-hidden="true"></i>
          <h2>{currentUser.likers.length + personText}</h2>
          <i className="fa fa-arrow-right fa-2" aria-hidden="true"></i>
        </section>

        <section className="user-list-about">
          <h1>{tabData.aboutText}</h1>
          <p>{tabData.aboutBody}</p>
        </section>
      </div>
    );
  },

  render: function () {
    return (
      <div id="likes-main" className="group">
        <section id="likes-header" className="group">
          <h1>Likes</h1>

          <ul className="page-tabs">
            <li
              value={0}
              onClick={this.selectTab}
              id={this.state.tabOneSelected}
            >
              Who Likes You
            </li>

            <li
              value={1}
              onClick={this.selectTab}
              id={this.state.tabTwoSelected}
            >
              Mutual Likes
            </li>
            <li
              value={2}
              onClick={this.selectTab}
              id={this.state.tabThreeSelected}
            >
              Who You Like
            </li>
          </ul>
        </section>

        <div className="likes-monolith">
          <div id="main-column">{this.renderGeneralTab()}</div>
        </div>
      </div>
    );
  },
});

export default LikesMain;

// Fun tabs. Saved for posterity.
// var Tabs = ({
//   0: {
//     aboutText: 'About Who Likes You',
//     aboutBody: "These are people who like you on PerfectPair’s site. Maybe they could like you in real life too! You don't get that kind of vulnerability every day. Imagine how messed up it would be if people just wore their insecurities on their chests. I know I wouldn't leave the house if every shirt I owned said 'sensitive about the size of his hands'",
//     group: 'likers'
//   },
//   1: {
//     aboutText: 'About Mutual Likes',
//     aboutBody: "These people like you back but you're sitting here reading this, and NOT messaging them? Imagine the sheer vulnerability it takes to tell someone you like them. You've already both opened yourselves up to the cold, horrible world, and you're letting eachother shiver there like an exposed nerve! When I was in second grade, I told a girl I liked her, so she spilled my lemonade on my math homework and told everyone I 'peed my homework'. My family had to move because I would cry every time I got within two and a half miles of the school. My dad had a cancer scare and everything. He's fine though. He took me aside after the 'oscopy and said 'son, I'm really high on painkillers, and it's very important that you look at these pictures of the inside of my colon'",
//     group: 'mutual_likes'
//   },
//   2: {
//     aboutText: 'About Who You Like',
//     aboutBody: "These are people you’ve liked on PerfectPair’s site. Be bold, send them a message, or don't and wallow. Not my problem!",
//     group: 'likees'
//   }
// });
