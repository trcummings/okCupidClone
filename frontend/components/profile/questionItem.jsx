var React = require('react');
var PropTypes = React.PropTypes;
var HelperUtil = require('../../util/helperUtil');

var QuestionItem = React.createClass({

  getInitialState: function () {
    HelperUtil.getRandomQuestion(function (questionBundle) {
      this.setState({ questionBundle: questionBundle });
    }.bind(this));

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
    var questionBundle = this.state.questionBundle;

    if (questionBundle) {
      var question = questionBundle.question;
      var questionChoices = questionBundle.questionChoices;

      if (this.state.questionFormRendered) {
        return (
          <section id='questionForm'>
            <h1>{question.content}</h1>

            <button
              className='answer-button'
              onClick={this.handleSubmit}
            >
              Submit
            </button>

            <button
              className='skip-button'
              onClick={this.handleCancel}
            >
              Cancel
            </button>

          </section>
        );
      } else {
        return (
          <section id='question-item'>
            <h1>{question.content}</h1>
            <button onClick={this.handleAnswerClick}> Answer </button>
            <button onClick={this.handleSkipQuestion}> Skip Question </button>
          </section>
        );
      }
    } else {
      return (<div />);
    }
  }

});

module.exports = QuestionItem;
