import React from "react";
import createClass from "create-react-class";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import SignInForm from "./SignInForm";
import FirstSignUpForm from "./FirstSignUpForm";
import SecondSignUpForm from "./SecondSignUpForm";
import FinalSignUpForm from "./FinalSignUpForm";

import ClientActions from "../../actions/clientActions";
import AuthInfoStore from "../../stores/authInfoStore";

var modalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.60)",
  },
  content: {
    align: "center",
    display: "block",
    position: "relative",
    width: "280px",
    height: "400px",
    top: "40px",
    marginBottom: "60px",
    marginLeft: "-155px",
    fontSize: "13px",
    textAlign: "center",
    left: "50%",
    padding: "10px",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "8px",
    outline: "none",
  },
};

var AuthMain = createClass({
  getInitialState: function () {
    Modal.setAppElement(document.body);
    return {
      modalOpen: false,
      formNumber: AuthInfoStore.currentAuthState(),
    };
  },

  contextTypes: {
    router: PropTypes.object.isRequired,
  },

  componentDidMount: function () {
    this.listener = AuthInfoStore.addListener(
      function () {
        this.setState({ formNumber: AuthInfoStore.currentAuthState() });
      }.bind(this)
    );
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  closeModal: function () {
    this.setState({ modalOpen: false });
  },

  openModal: function () {
    this.setState({ modalOpen: true });
  },

  currentForm: function () {
    if (this.state.formNumber === "first") {
      return <FirstSignUpForm />;
    } else if (this.state.formNumber === "second") {
      return <SecondSignUpForm />;
    } else if (this.state.formNumber === "final") {
      return <FinalSignUpForm />;
    }
  },

  signInGuest: function () {
    ClientActions.loginWithUsername(
      {
        username: "guestyMcGuestFace",
        password: "guestuser",
      },
      function () {
        this.context.router.push("/matches");
      }.bind(this)
    );
  },

  render: function () {
    return (
      <div id="signup_bg">
        <header className="signup_header">
          <div className="header_login">
            <span> Have an account? </span>
            <button className="flatbutton" onClick={this.openModal}>
              Sign in
            </button>

            <button className="flatbutton" onClick={this.signInGuest}>
              Guest
            </button>
          </div>

          <Modal
            isOpen={this.state.modalOpen}
            onRequestClose={this.closeModal}
            style={modalStyle}
            ref="popup"
          >
            <SignInForm closeModal={this.closeModal} />
          </Modal>
        </header>

        <a href="/">
          <img id="perfectPair" src={window.perfectPair} />
        </a>

        <div className="signup_form">{this.currentForm()}</div>
      </div>
    );
  },
});

export default AuthMain;
