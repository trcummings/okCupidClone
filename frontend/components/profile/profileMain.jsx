var React = require('react');
var ClientActions = require('../../actions/clientActions');
var SessionStore = require('../../stores/sessionStore');
var HelperUtil = require('../../util/helperUtil');
var BasicInfoEditModal = require('./modals/basicInfoEditModal');

var ProfileMain = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      selectedPane: 0
    };
  },

  selectTab: function (num) {
    this.setState({selectedPane: num});
  },

  render: function () {
    var currentUser = SessionStore.currentUser();
    // var pane = this.props.panes[this.state.selectedPane];

    if (currentUser) {
      return (
        <div className='profile-basic-information'>
          <h1 className='profile-user-name'>{currentUser.username}</h1>
          <ul>
            <li>{currentUser.location}</li>
            <li>{HelperUtil.returnAge(currentUser.birth_date)}</li>
            <li>{currentUser.gender}</li>
            
            <BasicInfoEditModal />
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          scoobert doobert!
          you shouldn't be here!
        </div>
      );
    }
  }
});

module.exports = ProfileMain;
