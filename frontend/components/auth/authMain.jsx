var React = require('react'),
    ReactDOM = require('react-dom'),
    Modal = require("react-modal"),
    SignInForm = require('./signInForm'),
    FirstSignUpForm = require('./firstSignUpForm'),
    SecondSignUpForm = require('./secondSignUpForm'),
    FinalSignUpForm = require('./finalSignUpForm'),
    AuthInfoStore = require('../../stores/authInfoStore'),
    ClientActions = require('../../actions/clientActions');

var modalStyle = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.60)'
  },
  content : {
    align: 'center',
    display: 'block',
    position: 'relative',
    width: '214px',
    height: '378px',
    top: '40px',
    marginBottom: '60px',
    marginLeft: '-155px',
    fontSize: '13px',
    textAlign: 'center',
    left: '50%',
    padding: '28px 48px 40px',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '8px',
    outline                    : 'none',
  }
};

var AuthMain = React.createClass({
  getInitialState: function(){
    Modal.setAppElement(document.body);
    return({
      modalOpen: false,
      formNumber: AuthInfoStore.currentAuthState()
    });
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
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

  signInGuest: function () {
    ClientActions.loginWithUsername(
      {
        username: 'OkComputer',
        password: 'guestuser'
      },
      function () {
        this.context.router.push("/matches");
      }.bind(this)
    );
  },

  githubSignIn: function () {
    // ClientActions.loginWithUsername(
    //   {
    //     username: 'OkComputer',
    //     password: 'guestuser'
    //   },
    //   function () {
    //     this.context.router.push("/matches");
    //   }.bind(this)
    // );
    alert('not today, friend');
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

            <button
              id="open_sign_in_button"
              class="flatbutton clear dark-bg"
              onClick={this.signInGuest}
              >
              Guest
            </button>

            <button
              id="open_sign_in_button"
              class="flatbutton clear dark-bg"
              onClick={this.githubSignIn}
              >
              Sign in with
              {' '}
              <i className="fa fa-github" aria-hidden="true"></i>
            </button>
          </div>

          <Modal
            isOpen={this.state.modalOpen}
            onRequestClose={this.closeModal}
            style={modalStyle}
            ref='popup'
          >

            <SignInForm closeModal={this.closeModal}/>
          </Modal>
        </header>

        <a href='/'>
          <img id='perfectPair' src={window.perfectPair} />
        </a>


        <div className='signup_form'>
          {this.currentForm()}
        </div>
      </div>
    );
  }
});

module.exports = AuthMain;
