var React = require('react'),
    Modal = require("react-modal"),
    SignInForm = require('./signInForm'),
    FirstSignUpForm = require('./firstSignUpForm'),
    SecondSignUpForm = require('./secondSignUpForm'),
    FinalSignUpForm = require('./finalSignUpForm'),
    AuthInfoStore = require('../../stores/authInfoStore'),
    ClientActions = require('../../actions/clientActions');

var AuthMain = React.createClass({
  getInitialState: function(){
    Modal.setAppElement(document.body);
    return({
      modalOpen: false,
      formNumber: AuthInfoStore.currentAuthState()
    });
  },

  componentDidMount: function () {
    this.listener = AuthInfoStore.addListener(function () {
      this.setState({ formNumber: AuthInfoStore.currentAuthState() });
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  closeModal: function() {
    this.setState({ modalOpen: false });
  },

  openModal: function(){
    this.setState({ modalOpen: true });
  },

  currentForm: function () {
    if (this.state.formNumber === 'first') {
      return (
        <FirstSignUpForm />
      );
    } else if (this.state.formNumber === 'second') {
      return (
        <SecondSignUpForm />
      );
    } else if (this.state.formNumber === 'final') {
      return (
        <FinalSignUpForm />
      );
    }
  },

  render: function () {
    return (
      <div id='signup_bg'>
        <header className='signup_header'>
          <div className="header_login">
            <span> Have an account? </span>
            <button
              id="open_sign_in_button"
              class="flatbutton clear dark-bg"
              onClick={this.openModal}
              >
              Sign in
            </button>

            <Modal
              isOpen={this.state.modalOpen}
              onRequestClose={this.openModal}>

              <button
                className='close_modal_button'
                onClick={this.closeModal}>
              X
              </button>

              <SignInForm modal={this.closeModal}/>
            </Modal>
          </div>
        </header>

        <div className='signup_form'>
          {this.currentForm()}
        </div>
      </div>
    );
  }
});

module.exports = AuthMain;
