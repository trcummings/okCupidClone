var React = require('react');

var App = React.createClass({
  render: function () {
    return (
      <div>
      app academok
      {this.props.children}
      </div>
    );
  }
});

module.exports = App;
