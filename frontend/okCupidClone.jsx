var React = require('react'),
    ReactDOM = require('react-dom');

// document.addEventListener('DOMContentLoaded', function () {
//   ReactDOM.render(
//     <div>Walcome to wobsite</div>,
//     document.getElementById('content')
//   );
// });

var Router = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
    </Route>
  </Router>
);

// var Router = (
//   <Router history={hashHistory}>
//     <Route path="/" component={App}>
//       <IndexRoute component={Feed}/>
//       <Route path="matches" component={MatchIndex}>
//         <Route path="matches/:user_id" component={MatchDetail}/>
//       </Route>
//       <Route path="profile" component={Profile}></Route>
//     </Route>
//   </Router>
// );

document.addEventListener('DOMContentLoaded', function(){
  var root = document.getElementById('content');
  ReactDOM.render(Router, root);
});
