var React = require('react');
var PropTypes = React.PropTypes;
var QuestionItem = require('./questionItem');
var SessionStore = require('../../stores/sessionStore');
var ClientActions = require('../../actions/clientActions');

var ProfileQuestionsTab = React.createClass({
  getInitialState: function () {
    var answers = SessionStore.currentUser();
    answers = answers.answers;

    return (
      { answers: answers }
    );
  },

  componentDidMount: function () {
    this.answerListener = SessionStore.addListener(function () {
      var answers = SessionStore.currentUser();
      answers = answers.answers;

      this.setState({ answers: answers });
    }.bind(this));

    ClientActions.getAllAnswers();
  },

  componentWillUnmount: function () {
    this.answerListener.remove();
  },

  renderAnswers: function () {
    var answers = this.state.answers;

    if (answers) {
      var result = [];

      answers.forEach(function (answer, index) {
        result.push(
          <li id='question-item' key={index}>
            <h1>{answer.content}</h1>
            <ul id='answer-item'>
              {this.renderAnswerItems(answer)}
            </ul>
            {this.renderQuestionFooter(answer)}
          </li>
        );
      }.bind(this));

      return result;
    } else {
      return (<div />);
    }
  },

  renderAnswerItems: function (answer) {
    var result = [];
    var answerChoices = answer.question_choices;

    if (answer.answerChoices) {
      answer.answerChoices.forEach(function (choice, index) {
        var selectorString = '';

        if (answer.importance === 0) {
          selectorString = 'irrelevant';
        } else if (answer.acceptable_ids.indexOf(choice.id.toString()) === -1) {
          selectorString = 'unacceptable';
        } else if (
          answer.chosen_ids.indexOf(choice.id.toString()) !== -1 &&
          answer.acceptable_ids.indexOf(choice.id.toString()) !== -1
        ) {
          selectorString = 'answered desired';
        } else {
          selectorString = 'answered acceptable';
        }

        result.push(
          <li className={selectorString} key={index}>
            {choice.choice_string}
          </li>
        );
      });

      return result;

    } else {
      return (<div />);
    }
  },

  renderQuestionFooter: function (answer) {

    if (answer.explanation) {
      return (
        <div>
        <article className='explanation'>
          <h3>Your explanation</h3>
          <p>{answer.explanation}</p>
        </article>
        <section className='question-footer'>
          <button className='explain-button'>
            <i className="fa fa-pencil" aria-hidden="true">
            </i>
            Edit explanation
          </button>
          <button className='re-answer-button'>
            Re-answer
          </button>
        </section>
      </div>
      );
    } else {
      return (
        <section className='question-footer'>
          <button className='explain-button'>
            <i className="fa fa-pencil" aria-hidden="true">
            </i>
            Add an explanation
          </button>
          <button className='re-answer-button'>
            Re-answer
          </button>
        </section>
      );
    }

  },

  render: function() {
    return (
      <div id='questions-tab'>
        <QuestionItem />

        <section id='answered-questions'>
          <h2>Show Answers</h2>

          <ul id='answered-list'>
            {this.renderAnswers()}
          </ul>

        </section>
      </div>
    );
  }

});

module.exports = ProfileQuestionsTab;
