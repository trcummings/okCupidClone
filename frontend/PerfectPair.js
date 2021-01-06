import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import App from "./components/App";
import ProfileMain from "./components/profile/ProfileMain";
import FeedIndex from "./components/feed/FeedIndex";
import MatchesIndex from "./components/matches/MatchesIndex";
import MatchesDetail from "./components/matches/MatchesDetail";
import LikesMain from "./components/likes/LikesMain";

import SessionStore from "./stores/sessionStore";
import SessionApiUtil from "./util/sessionApiUtil";

function _ensureLoggedIn(nextState, replace, asyncDoneCallback) {
  if (SessionStore.currentUserHasBeenFetched()) {
    redirectIfNotLoggedIn();
  } else {
    SessionApiUtil.fetchCurrentUser(redirectIfNotLoggedIn);
  }

  function redirectIfNotLoggedIn() {
    if (!SessionStore.isUserLoggedIn()) {
      replace("/");
    }

    asyncDoneCallback();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById("content");

  ReactDOM.render(
    <Router>
      <App>
        <Switch>
          <Route
            path="/profile"
            component={ProfileMain}
            onEnter={_ensureLoggedIn}
          />
          <Route path="/home" component={FeedIndex} onEnter={_ensureLoggedIn} />
          <Route
            path="/matches"
            component={MatchesIndex}
            onEnter={_ensureLoggedIn}
          />
          <Route
            path="/profile/:username"
            component={MatchesDetail}
            onEnter={_ensureLoggedIn}
          />
          <Route
            path="/likes"
            component={LikesMain}
            onEnter={_ensureLoggedIn}
          />
        </Switch>
      </App>
    </Router>,
    root
  );
});
