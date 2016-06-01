var React = require('react'),
    ClientActions = require('../../actions/clientActions'),
    HelperUtil = require('../../util/helperUtil');

var SignInForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      nameField: '',
      password: ''
    };
  },

  handleSubmit: function () {
    var loginType = HelperUtil.parseNameField(this.state.nameField);
    var callback = function () {
      this.props.closeModal();
      this.context.router.push("/home");
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

  render: function () {
    return (
      <form className='sign-in-form authForm' onSubmit={this.handleSubmit}>
        <h1>Sign In</h1>

        <input
          id='nameField'
          type='text'
          className="text_box_item"
          placeholder="Your email or username"
          onChange={this.handleNameFieldChange}
          value={this.state.nameField}
         />

         <input
           id='password'
           type='password'
           className="text_box_item"
           placeholder="Your password"
           onChange={this.handlePasswordChange}
           value={this.state.password}
          />

        <button id='continue_button' type='submit'>Sign in</button>
      </form>
    );
  }
});

module.exports = SignInForm;
