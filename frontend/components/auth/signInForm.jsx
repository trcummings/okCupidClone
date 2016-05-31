var React = require('react');

var SignInForm = React.createClass({
  getInitialState: function () {
    return {
      nameField: 'Your Username or Password',
      password: 'Your Password' 
    };
  },

  handleSubmit: function () {
    var loginType = HelperUtil.parseNameField(this.state.nameField);

    if (loginType === 'username') {
      ClientActions.loginViaUsername({
        username: this.state.nameField,
        password: this.state.password
      });
    } else if (loginType === 'email') {
      ClientActions.loginViaEmail({
        email: this.state.nameField,
        password: this.state.password
      });
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
      <form className='sign-in-form' onSubmit={this.handleSubmit}>
        <input
          id='nameField'
          type='text'
          onChange={this.handleNameFieldChange}
          value={this.state.nameField}
         />

         <input
           id='password'
           type='password'
           onChange={this.handlePasswordChange}
           value={this.state.password}
          />
      </form>
    );
  }
});

module.exports = SignInForm;
