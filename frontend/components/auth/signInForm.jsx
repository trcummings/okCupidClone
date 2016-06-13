var React = require('react'),
    ClientActions = require('../../actions/clientActions'),
    ErrorActions = require('../../actions/errorActions'),
    HelperUtil = require('../../util/helperUtil'),
    ErrorStore = require('../../stores/errorStore'),
    ReactDOM = require('react-dom');

var SignInForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      nameField: '',
      password: '',
      errors: { },
      errored: ""
    };
  },

  componentDidMount: function () {
    this.errorListener = ErrorStore.addListener(function () {
      this.setState({
        errors: ErrorStore.formErrors('login'),
        errored: "error-field"
       });
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.errorListener.remove();
  },

  githubSignIn: function (event) {
    event.preventDefault();
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

  handleSubmit: function (event) {
    event.preventDefault();

    var loginType = HelperUtil.parseNameField(this.state.nameField);
    var callback = function () {
      this.props.closeModal();
      this.context.router.push("/matches");
    }.bind(this);

    if (loginType === 'username') {
      ClientActions.loginWithUsername({
        username: this.state.nameField,
        password: this.state.password
      }, callback);
    } else if (loginType === 'email') {
      ClientActions.loginWithEmail({
        email: this.state.nameField,
        password: this.state.password
      }, callback);
    }
  },

  handleNameFieldChange: function (event) {
    this.setState({ nameField: event.target.value });
  },

  handlePasswordChange: function (event) {
    this.setState({ password: event.target.value });
  },

  errorText: function () {
    if (Object.keys(this.state.errors).length > 0) {
      return (
        (ErrorStore.errorsArray()).map(function (error, index) {
          return (
            <li className='error-statement' key={index}>
              {error}
            </li>
            );
        })
      );
    } else {
      return "";
    }
  },

  render: function () {
    return (
      <form className='sign-in-form authForm' onSubmit={this.handleSubmit}>
        <h1>Sign In</h1>

        <input
          ref='inputField'
          id='nameField'
          type='text'
          className={'text_box_item ' + this.state.errored}
          placeholder="Your email or username"
          onChange={this.handleNameFieldChange}
          value={this.state.nameField}
         />

         <input
           ref='inputField'
           id='password'
           type='password'
           className={'text_box_item ' + this.state.errored}
           placeholder="Your password"
           onChange={this.handlePasswordChange}
           value={this.state.password}
          />

        <ul>
          {this.errorText()}
        </ul>

        <button id='continue_button' type='submit'>Sign in</button>


      </form>
    );
  }
});

module.exports = SignInForm;

// <button
//   id="open_sign_in_button"
//   class="flatbutton clear dark-bg"
//   onClick={this.githubSignIn}
//   >
//   Sign in with
//   {' '}
//   <i className="fa fa-github" aria-hidden="true"></i>
// </button>
