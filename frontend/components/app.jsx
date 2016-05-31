var React = require('react');
var AuthMain = require('./auth/authMain');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <AuthMain />
        {this.props.children}
      </div>
    );
  }
});

module.exports = App;
