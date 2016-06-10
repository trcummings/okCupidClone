var React = require('react');
var PropTypes = React.PropTypes;
var QuestionItem = require('./questionItem');
var SessionStore = require('../../stores/sessionStore');
var ClientActions = require('../../actions/clientActions');

var ProfileQuestionsTab = React.createClass({
  getInitialState: function () {
    var currentUser = SessionStore.currentUser();
    var answers = currentUser.answers;
    this.renderExpForm = [];

    return ({
      answers: answers,
      explanation: {},
      questionProp: null
    });
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
    this.renderExpForm = [];
    this.setState({ questionProp: null });
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
            {this.renderQuestionFooter(answer, index)}
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

    if (answerChoices) {
      answerChoices.forEach(function (choice, index) {
        var selectorString = '';

        if (answer.importance === 0) {
          selectorString = 'indifferent';
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



  handleExplanationUpdate: function (index, event) {
    event.preventDefault();
    var new_explan = this.state.explanation;

    new_explan[index] = event.target.value;

    this.setState({ explanation: new_explan });
  },

  handleExplanationSubmit: function (index, answer, event) {
    event.preventDefault();
    var new_explan = this.state.explanation;

    this.renderExpForm.forEach(function (index) {
      var expFormIndex = this.renderExpForm.indexOf(index);
      if (new_explan[index]) {
        ClientActions.updateAnswer(
          {
            question_id: answer.question_choices[0].question_id,
            importance: answer.importance,
            explanation: new_explan[index],
            chosen_ids: answer.chosen_ids,
            acceptable_ids: answer.acceptable_ids
          },
          function () {
            this.renderExpForm.splice(expFormIndex, 1);
            new_explan[index] = null;
            this.setState({ explanation: new_explan });
          }.bind(this) ///callback
        );
      }
    }.bind(this));
  },

  handleExplanationCancel: function (index, event) {
    event.preventDefault();
    var expFormIndex = this.renderExpForm.indexOf(index);
    var new_explan = this.state.explanation;
    this.renderExpForm.splice(expFormIndex, 1);

    new_explan[index] = null;
    this.setState({ explanation: new_explan });
  },

  toggleExplanationForm: function (index, event) {
    event.preventDefault();
    var expFormIndex = this.renderExpForm.indexOf(index);

    if (expFormIndex === -1) {
      this.renderExpForm.push(index);
    } else {
      this.renderExpForm.splice(expFormIndex, 1);
    }
    this.forceUpdate();
  },

  explanationForm: function (answer, index) {
    var explanation;
    var buttonText;

    if (answer) {
      explanation = answer.explanation;
      buttonText = 'Edit explanation';
    } else {
      buttonText = 'Add explanation';
    }

    if (this.renderExpForm.indexOf(index) !== -1) {
      return (
        <form className='explain-form'>
          <textarea
            defaultValue={explanation}
            onChange={this.handleExplanationUpdate.bind(null, index)}
          >
          </textarea>

          <button
            className='answer-button'
            onClick={this.handleExplanationSubmit.bind(null, index, answer)}
          >
            Submit
          </button>

          <button
            className='cancel-button'
            onClick={this.handleExplanationCancel.bind(null, index)}
          >
            Cancel
          </button>
        </form>
      );
    } else {
      return (
        <section className='question-options'>
          <button className='explain-button'
            onClick={this.toggleExplanationForm.bind(null, index)}
          >
            <i className="fa fa-pencil" aria-hidden="true">
            </i>
            {buttonText}
          </button>
          <button
            className='re-answer-button'
            onClick={this.reAnswerQuestion.bind(null, answer)}
          >
            Re-answer
          </button>
        </section>
      );
    }
  },

  renderQuestionFooter: function (answer, index) {
    if (answer.explanation) {
      return (
        <div>
          <article className='explanation'>
            <h3>Your explanation</h3>
            <p>{answer.explanation}</p>
          </article>
          {this.explanationForm(answer, index)}
        </div>
      );
    } else {
      return (
        <div>
          {this.explanationForm(answer, index)}
        </div>
      );
    }

  },

  reAnswerQuestion: function (answer, event) {
    event.preventDefault();

    this.setState(
      { questionProp: answer }
    );
  },

  render: function () {
    return (
      <div id='questions-tab'>
        <QuestionItem question={this.state.questionProp}/>

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
