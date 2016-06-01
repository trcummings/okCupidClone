var React = require('react'),
    SessionStore = require('../../../stores/sessionStore');

var BasicInfoEditForm = React.createClass({
  getInitialState: function () {
    return ({ });
  },

  handleUsernameChange: function (event) {
    this.setState({ username: event.target.value });
  },

  render: function() {
    var currentUser = SessionStore.currentUser();

    return (
      <form className=''>
        <p className='edit-form-title'>
          Your Basic Information
        </p>

        <label>
          Username

          <input
            type='text'
            onChange={this.handleUsernameChange}
            placeholder={currentUser.username}
          />
        </label>
      </form>
    );
  }

});

module.exports = BasicInfoEditForm;
