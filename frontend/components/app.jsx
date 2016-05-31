var React = require('react');
var Auth = require('./auth');

var App = React.createClass({
  render: function () {
    return (
      <Auth />
    );
  }
});

module.exports = App;
