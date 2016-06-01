var React = require('react');
var ClientActions = require('../actions/clientActions');

var HeaderMessagesDropDown = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render: function () {
    return (
      <ul className='header-profile-options'>
        <li>
          NOTHING HERE YET
        </li>
        <li>
          NOTHING HERE YET
        </li>
        <li>
          NOTHING HERE YET
        </li>
        <li>
          NOTHING HERE YET
        </li>
        <li>
          NOTHING HERE YET
        </li>
      </ul>
    );
  }

});

module.exports = HeaderMessagesDropDown;
