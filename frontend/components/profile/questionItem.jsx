var React = require('react');
var PropTypes = React.PropTypes;

var QuestionItem = React.createClass({
  getInitialState: function () {
    return ({
      questionFormRendered: false
    });
  },

  handleAnswerClick: function (event) {
    event.preventDefault();

    this.setState({
      questionFormRendered: true
    });
  },

  handleSubmit: function (event) {
    event.preventDefault();

    // and then submit it
  },

  handleCancel: function (event) {
    event.preventDefault();

    this.setState({
      questionFormRendered: false
    });
  },

  handleSkipQuestion: function (event) {
    event.preventDefault();
  },

  render: function() {

    if (this.state.questionFormRendered) {
      return (
        <section id='questionForm'>
          Swiggity Swooty
          <button onClick={this.handleSubmit}> Submit </button>
          <button onClick={this.handleCancel}> Cancel </button>
        </section>
      );
    } else {
      return (
        <section id='questionItemForm'>
          <h1> Question Title </h1>
          <p> Question Body </p>
          <button onClick={this.handleAnswerClick}> Answer </button>
          <button onClick={this.handleSkipQuestion}> Skip Question </button>
        </section>
      );
    }
  }

});

module.exports = QuestionItem;
