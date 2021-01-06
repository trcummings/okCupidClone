import React, { Component } from "react";
import createClass from "create-react-class";
import PropTypes from "prop-types";

// import AuthMain from "./auth/AuthMain";
import Header from "./Header";
import Footer from "./Footer";

import ClientActions from "../actions/clientActions";
import SessionStore from "../stores/sessionStore";

export default class App extends Component {
  // contextTypes = {
  //   router: PropTypes.object.isRequired,
  // };

  getInitialState() {
    return { currentUser: SessionStore.currentUser() };
  }

  componentDidMount() {
    this.listener = SessionStore.addListener(
      function () {
        this.checkForCurrentUser();
      }.bind(this)
    );

    if (this.state.currentUser) {
      this.context.router.push("/matches");
    }
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  checkForCurrentUser() {
    var currentUser = SessionStore.currentUser();

    if (currentUser) {
      this.setState({ currentUser: currentUser });
    }
  }

  handleClick(event) {
    event.preventDefault();

    ClientActions.logout(
      function () {
        this.context.router.push("/");
      }.bind(this)
    );
  }

  render() {
    return (
      <div>
        {SessionStore.isUserLoggedIn() ? (
          <div>
            <Header />
            // <div className="main-div">{this.props.children}</div>
            <div className="main-div">lol</div>
            <Footer />
          </div>
        ) : (
          <div>
            // <AuthMain />
            <footer id="auth-main-footer"></footer>
          </div>
        )}
      </div>
    );
  }
}

// var App = createClass({
//   contextTypes: {
//     router: PropTypes.object.isRequired,
//   },
//
//   getInitialState: function () {
//     return { currentUser: SessionStore.currentUser() };
//   },
//
//   componentDidMount: function () {
//     this.listener = SessionStore.addListener(
//       function () {
//         this.checkForCurrentUser();
//       }.bind(this)
//     );
//
//     if (this.state.currentUser) {
//       this.context.router.push("/matches");
//     }
//   },
//
//   componentWillUnmount: function () {
//     this.listener.remove();
//   },
//
//   checkForCurrentUser: function () {
//     var currentUser = SessionStore.currentUser();
//
//     if (currentUser) {
//       this.setState({ currentUser: currentUser });
//     }
//   },
//
//   // welcome: function () {
//   //   if (SessionStore.isUserLoggedIn()) {
//   //     return (
//   //       <div>
//   //         <Header />
//   //         <div className="main-div">{this.props.children}</div>
//   //         <Footer />
//   //       </div>
//   //     );
//   //   } else {
//   //     return (
//   //       <div>
//   //         <AuthMain />
//   //         <footer id="auth-main-footer"></footer>
//   //       </div>
//   //     );
//   //   }
//   // },
//
//   handleClick: function (event) {
//     event.preventDefault();
//
//     ClientActions.logout(
//       function () {
//         this.context.router.push("/");
//       }.bind(this)
//     );
//   },
//
//   render: function () {
//     return (
//       <div>
//         {SessionStore.isUserLoggedIn() ? (
//           <div>
//             <Header />
//             // <div className="main-div">{this.props.children}</div>
//             <div className="main-div">lol</div>
//             <Footer />
//           </div>
//         ) : (
//           <div>
//             // <AuthMain />
//             <footer id="auth-main-footer"></footer>
//           </div>
//         )}
//       </div>
//     );
//   },
// });
//
// export default App;
