var React = require('react');
var ClientActions = require('../../actions/clientActions');
var HelperUtil = require('../../util/helperUtil');
var AuthInfoStore = require('../../stores/authInfoStore');

var FinalSignUpForm = React.createClass({
  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>fuck yeah</div>
      </form>
    );
  }
});

module.exports = FinalSignUpForm;
