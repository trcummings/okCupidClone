var React = require('react');
var ClientActions = require('../../actions/clientActions');
var HelperUtil = require('../../util/helperUtil');
var AuthInfoStore = require('../../stores/authInfoStore');

var FirstSignUpForm = React.createClass({
  getInitialState: function () {
    return ({
      orientation: 'Straight',
      gender: 'Woman'
    });
  },

  componentDidMount: function () {

  },

  handleSubmit: function (event) {
    event.preventDefault();

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
      <div className='authForm group'>
        <h1> 'Join' the 'Best' 'Free' 'Dating' site on 'Earth' </h1>
        <form className="form_one group" onSubmit={this.handleSubmit}>
          <span className="form_one_item"> I am a </span>

          <label className="dropdown orientation form_one_item" onBlur={this.handleOrientationChange}>
            <select className='dropdown-select' onChange={this.handleOrientationChange}>
              <option value="Straight">Straight</option>
              <option value="Gay">Gay</option>
              <option value="Bisexual">Bisexual</option>
              <option value="Woman Preferring">Woman Preferring</option>
              <option value="Man Preferring">Man Preferring</option>
              <option value="Sapiosexual">Sapiosexual</option>
            </select>
          </label>

        <label className="dropdown gender form_one_item" onBlur={this.handleGenderChange}>
            <select className='dropdown-select' onChange={this.handleGenderChange}>
              <option value="Woman">Woman</option>
              <option value="Man">Man</option>
              <option value="NonBinary">NonBinary</option>
              <option value="Anime Enthusiast">Anime Enthusiast</option>
            </select>
          </label>

        <button
          type='submit'
          className="flatbutton form_one_item"
        >Continue</button>
        </form>
      </div>
    );
  }
});

module.exports = FirstSignUpForm;
