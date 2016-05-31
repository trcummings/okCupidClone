var React = require('react');
var Modal = require("react-modal");

var Auth = React.createClass({
  getInitialState: function(){
    Modal.setAppElement(document.body);
    return({ modalOpen: false });
  },

  closeModal: function(){
    this.setState({ modalOpen: false });
  },

  openModal: function(){
    this.setState({ modalOpen: true });
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

          <SignInForm onSubmit={this.closeModal}/>
        </Modal>
      </div>
    );
  }
});



module.exports = Auth;
