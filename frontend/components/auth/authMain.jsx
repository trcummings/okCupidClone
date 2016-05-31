var React = require('react');
var Modal = require("react-modal");
var SignInForm = require('./signInForm');
var FirstSignUpForm = require('./firstSignUpForm');
var SecondSignUpForm = require('./secondSignUpForm');
var FinalSignUpForm = require('./finalSignUpForm');
var AuthInfoStore = require('../../stores/authInfoStore');
var ClientActions = require('../../actions/clientActions');

var AuthMain = React.createClass({
  getInitialState: function(){
    Modal.setAppElement(document.body);
    return({
      modalOpen: false,
      formNumber: 'first'
     });
  },

  componentDidMount: function () {
    this.listener = AuthInfoStore.addListener(function () {
      this.setState({ formNumber: AuthInfoStore.currentAuthState() });
    }.bind(this));
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

  hamgleClimp: function () {
    ClientActions.incrementAuthState();
  },

  render: function () {
    return (
      <div class="header_login">
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

        {this.currentForm()}
      </div>
    );
  }
});



module.exports = AuthMain;
