var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    hashHistory = require('react-router').hashHistory,
    App = require('./components/app');
    Header = require('./components/header');

var Router = (
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <Route component={Header} onEnter={ _ensureLoggedIn }></Route>
    </Route>
  </Router>
);

function _ensureLoggedIn(nextState, replace, asyncDoneCallback) {
  if (SessionStore.currentUserHasBeenFetched()) {
    redirectIfNotLoggedIn();
  } else {
    SessionApiUtil.fetchCurrentUser(redirectIfNotLoggedIn);
  }

  function redirectIfNotLoggedIn() {
    if (!SessionStore.isUserLoggedIn()) {
      replace('/');
    }
    asyncDoneCallback();
  }
}

// var Router = (
//   <Router history={hashHistory}>
//     <Route path='/' component={App}>
//       <Route component={Header} onEnter={ _ensureLoggedIn }>
//         <IndexRoute component={Feed} />
//         <Route path='/feed' component={Feed} />
//         <Route path='/matches' component={MatchesIndex} >
//           <Route path="matches/:user_id" component={MatchDetail}/>
//         </Route>
//         <Route path='/profile' component={Profile} />
//       </Route>
//     </Route>
//   </Router>
// );

document.addEventListener('DOMContentLoaded', function(){
  var root = document.getElementById('content');
  ReactDOM.render(Router, root);
});
