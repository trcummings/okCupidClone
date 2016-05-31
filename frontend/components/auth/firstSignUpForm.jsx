var React = require('react');
var ClientActions = require('../../actions/clientActions');
var HelperUtil = require('../../util/helperUtil');
var AuthInfoStore = require('../../stores/authInfoStore');

var FirstSignUpForm = React.createClass({
  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>fuck yeah</div>
      </form>
    );
  }
});

module.exports = FirstSignUpForm;
