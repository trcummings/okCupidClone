import React from "react";
import createClass from "create-react-class";

import MatchesIndexItem from "./MatchesIndexItem";
import MessageBox from "../messages/MessageBox";

import ClientActions from "../../actions/clientActions";
import UserStore from "../../stores/userStore";
import SessionStore from "../../stores/sessionStore";

var MatchesIndex = createClass({
  getInitialState: function () {
    return { allMatches: UserStore.allUsers() };
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(
      function () {
        this.setState({ allMatches: UserStore.allUsers() });
      }.bind(this)
    );

    ClientActions.fetchAllPossibleMatches();
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  handleSortByChange: function () {
    // don't even do shit yet
  },

  render: function () {
    var matches = this.state.allMatches;

    return (
      <div id="match-index">
        <div id="match-monolith">
          <div id="match-results">
            {matches.map(function (match, index) {
              return (
                <MatchesIndexItem
                  id="match-index-item"
                  key={index}
                  user={match}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  },
});

export default MatchesIndex;
