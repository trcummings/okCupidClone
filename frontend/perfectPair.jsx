const React = require("react");
const ReactDOM = require("react-dom");
const Router = require("react-router").Router;
const Route = require("react-router").Route;
const IndexRoute = require("react-router").IndexRoute;
const hashHistory = require("react-router").hashHistory;

const App = require("./components/app");
const ProfileMain = require("./components/profile/profileMain");
const FeedIndex = require("./components/feed/feedIndex");
const MatchesIndex = require("./components/matches/matchesIndex");
const MatchesDetail = require("./components/matches/matchesDetail");
const LikesMain = require("./components/likes/likesMain");

const SessionStore = require("./stores/sessionStore");
const SessionApiUtil = require("./util/sessionApiUtil");

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
    <Router history={hashHistory}>
      <Route path="/" component={App}>
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
        <Route path="/likes" component={LikesMain} onEnter={_ensureLoggedIn} />
      </Route>
    </Router>,
    root
  );
});
