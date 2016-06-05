var React = require('react'),
    SessionStore = require('../../../stores/sessionStore');
    HelperUtil = require('../../../util/helperUtil');

var BasicInfoEditForm = React.createClass({
  getInitialState: function () {
    return ({});
  },

  handleUsernameChange: function (event) {
    this.setState({ username: event.target.value });
  },

  handleGenderChange: function (event) {
    this.setState({ gender: event.target.value });
  },

  handleSubmit: function (event) {
    event.preventDefault();

    console.log("tried to submipbt");
  },

  handleCancel: function (event) {
    event.preventDefault();

    this.props.closeModal();
  },

  renderBirthdayList: function () {
    var months = HelperUtil.birthdayList.months;
    var result = [];
    var i = 0;

    for (var property in months) {
      if (months.hasOwnProperty(property)) {
        result.push(
          <option value={property} key={i}>{property}</option>
        );
        i++;
      }
    }

    return result;
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

        <label onBlur={this.handleGenderChange}>
          I am a
          <select className="dropdown gender" onChange={this.handleGenderChange}>
            <option value="Anime Enthusiast">Anime Enthusiast</option>
            <option value="Woman">Woman</option>
            <option value="Man">Man</option>
          </select>
        </label>

        <label>
          My Birthday
          <select className='dropdown'>
            {this.renderBirthdayList()}
          </select>

          <select className='dropdown'>
            <option value="Anime Enthusiast">Anime Enthusiast</option>
            <option value="Woman">Woman</option>
            <option value="Man">Man</option>
          </select>

          <select className='dropdown'>
            <option value="Anime Enthusiast">Anime Enthusiast</option>
            <option value="Woman">Woman</option>
            <option value="Man">Man</option>
          </select>
        </label>

        Country

        location edit (zip code)


        <button
          id='continue_button'
          className='save-button'
          onClick={this.handleSubmit}
          >
          Save
        </button>

        <button
          id='continue_button'
          className='save-button'
          onClick={this.handleCancel}
          >
          Cancel
        </button>
      </form>
    );
  }

});

module.exports = BasicInfoEditForm;
