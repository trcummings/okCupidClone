var React = require('react');
var ClientActions = require('../../actions/clientActions');
var HelperUtil = require('../../util/helperUtil');
var AuthInfoStore = require('../../stores/authInfoStore');

var FirstSignUpForm = React.createClass({
  getInitialState: function () {
    return ({
      orientation: 'Sapiosexual',
      gender: 'Anime Enthusiast'
    });
  },

  handleSubmit: function () {
    AuthInfoStore.addInfoPiece('orientation', this.state.orientation);
    AuthInfoStore.addInfoPiece('gender', this.state.gender);
    ClientActions.incrementAuthState();
  },

  handleOrientationChange: function (event) {
    this.setState({ orientation: event.target.value });
  },

  handleGenderChange: function (event) {
    this.setState({ gender: event.target.value });
  },

  render: function () {
    return (
      <div className='authForm'>
        <h1> 'Join' the 'Best' 'Free' 'Dating' site on 'Earth' </h1>
        <form onSubmit={this.handleSubmit}>
          <span> I am a </span>

          <label className="orientation" onBlur={this.handleOrientationChange}>
            <select onChange={this.handleOrientationChange}>
              <option value="Sapiosexual">Sapiosexual</option>
              <option value="Straight">Straight</option>
              <option value="Gay">Gay</option>
            </select>
          </label><br />

          <label className="gender" onBlur={this.handleGenderChange}>
            <select onChange={this.handleGenderChange}>
              <option value="Anime Enthusiast">Anime Enthusiast</option>
              <option value="Woman">Woman</option>
              <option value="Man">Man</option>
            </select>
          </label><br />

          <button type='submit'>Continue</button>
        </form>
      </div>
    );
  }
});

module.exports = FirstSignUpForm;
