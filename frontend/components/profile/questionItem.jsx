var React = require('react');
var PropTypes = React.PropTypes;
var HelperUtil = require('../../util/helperUtil');
var ClientActions = require('../../actions/clientActions');
var SessionStore = require('../../stores/sessionStore');

var QuestionItem = React.createClass({

  getInitialState: function () {
    this.hovered = ['not-hovered', 'not-hovered', 'not-hovered'];

    HelperUtil.getRandomQuestion(function (questionBundle) {
      this.setState({
        questionBundle: questionBundle
      });
    }.bind(this));

    return ({
      questionFormRendered: false,
      selectedAnswer: [],
      selectedDesire: [],
      importance: '',
      explanation: '',
      updatingQuestion: false
    });
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.question) {
      question = nextProps.question;

      this.setState({
        questionBundle: {
          question: nextProps.question,
          question_choices: nextProps.question.question_choices
         },
        questionFormRendered: true,
        selectedAnswer: [],
        selectedDesire: [],
        importance: '',
        explanation: question.explanation,
        updatingQuestion: true
      });
    }
  },

  componentDidMount: function () {
    this.answersListener = SessionStore.addListener(function () {
      HelperUtil.getRandomQuestion(function (questionBundle) {
        this.setState({
          questionBundle: questionBundle
        });
      }.bind(this));
    }.bind(this));

    ClientActions.getAllAnswers();
  },

  componentWillUnmount: function () {
    this.answersListener.remove();
  },

  handleAnswerClick: function (event) {
    event.preventDefault();

    this.setState({
      questionFormRendered: true
    });
  },

  handleSubmit: function (event) {
    event.preventDefault();

    if (
      this.state.importance !== '' &&
      this.state.selectedAnswer.length > 0 &&
      this.state.selectedDesire.length > 0
    ) {
      var givenAnswers = this.state.selectedAnswer;
      var desiredAnswers = this.state.selectedDesire;
      var questionChoices = this.state.questionBundle.question_choices;
      var givenArray = [];
      var desiredArray = [];

      questionChoices.forEach(function (choice, index) {
        if (givenAnswers.indexOf(choice.choice_string) !== -1) {
          givenArray.push(choice.id);
        }

        if (desiredAnswers.indexOf(choice.choice_string) !== -1) {
          desiredArray.push(choice.id);
        }
      });

      var submitInput = [{
        chosen_ids: givenArray,
        acceptable_ids: desiredArray,
        importance: this.state.importance,
        question_id: this.state.questionBundle.question.id,
        explanation: this.state.explanation
      }, function () {
        this.setState({
          questionFormRendered: false,
          selectedAnswer: [],
          selectedDesire: [],
          importance: '',
          explanation: ''
        });
      }.bind(this)];

      if (this.state.updatingQuestion) {
        submitInput[0].question_id = this.state.questionBundle.question.question_id;
        ClientActions.updateAnswer(submitInput[0], submitInput[1]);
      } else {
        ClientActions.answerQuestion(submitInput[0], submitInput[1]);
      }
    }
  },

  handleCancel: function (event) {
    event.preventDefault();

    this.setState({
      selectedAnswer: [],
      questionFormRendered: false
    });
  },

  handleSkipQuestion: function (event) {
    event.preventDefault();

    HelperUtil.getRandomQuestion(function (questionBundle) {
      this.setState({
        questionBundle: questionBundle
      });
    }.bind(this));
    this.forceUpdate();
  },

  handleExplanationEntry: function (event) {
    event.preventDefault();

    this.setState({
      explanation: event.target.value
    });
  },

  toggleSelect: function (event) {
    event.preventDefault();

    var questionBundle = this.state.questionBundle;
    var questionChoices = questionBundle.question_choices;
    var selectedAnswer = this.state.selectedAnswer;
    var selectIndex = selectedAnswer.indexOf(event.currentTarget.value);

    if (selectIndex !== -1) {
      selectedAnswer.splice(selectIndex, 1);
    } else {
      if (!(questionBundle.question.multi_select)) {
        selectedAnswer = [];
      }

      selectedAnswer.push(event.currentTarget.value);
    }

    this.setState({
      selectedAnswer: selectedAnswer
    });
  },

  toggleDesiredSelect: function (event) {
    event.preventDefault();

    var questionBundle = this.state.questionBundle;
    var questionChoices = questionBundle.question_choices;
    var selectedDesire = this.state.selectedDesire;
    var selectIndex = selectedDesire.indexOf(event.currentTarget.value);

    if (selectIndex !== -1) {
      // if you've deselected 'any'
      if (
        selectedDesire[selectIndex] === 'any' ||
        selectedDesire.indexOf('any') !== -1
      ) {
        selectedDesire = [];
        this.setState({ importance: '' });
      } else {
        // else, deselect the thing you clicked
        selectedDesire.splice(selectIndex, 1);
      }
    } else {
      // if you've picked 'any'
      if (event.currentTarget.value === 'any') {
        selectedDesire = [];

        this.setState({ importance: 'irrelevant' });

        questionChoices.forEach(function (choice) {
          selectedDesire.push(choice.choice_string);
        });
      }

      selectedDesire.push(event.currentTarget.value);
      // if you've picked all the choices BUT 'any'
      if (
        event.currentTarget.value !== 'any' &&
        selectedDesire.length === questionChoices.length
      ) {
        selectedDesire.push('any');
        this.setState({ importance: 'irrelevant' });
      }
    }

    this.setState({
      selectedDesire: selectedDesire
    });
  },

  setImportance: function (level) {
    if (level === 'not-very') {
      this.hovered = ['selected', 'not-hovered', 'not-hovered'];
    } else if (level === 'moderate') {
      this.hovered = ['selected', 'selected', 'not-hovered'];
    } else if (level === 'very') {
      this.hovered = ['selected', 'selected', 'selected'];
    }

    this.setState({ importance: level });
  },

  setHover: function (tab) {
    if (tab === 2) {
      this.hovered = ['hovered', 'hovered', 'hovered'];
    } else if (tab === 1) {
      this.hovered = ['hovered', 'hovered', 'not-hovered'];
    } else if (tab === 0) {
      this.hovered = ['hovered', 'not-hovered', 'not-hovered'];
    }
    this.forceUpdate();
  },

  removeHover: function () {
    this.hovered = ['not-hovered', 'not-hovered', 'not-hovered'];
    this.forceUpdate();
  },

  renderImportanceButtons: function () {
    if (this.state.importance === 'irrelevant') {
      return (
        <section className='importanceButtons'>
          <p>
            Irrelevant
          </p>

          <div>
            (Because you'll accept any answer, this question is marked irrelevant)
          </div>
        </section>
      );
    } else if (this.state.importance === '') {
      return (
        <section className='importanceButtons group'>
          <label
            className='group'
            onMouseEnter={this.setHover.bind(this, 0)}
            onMouseLeave={this.removeHover}
            onClick={this.setImportance.bind(this, 'not-very')}
          >
            <button
              className={'importance-button ' + this.hovered[0]}
            >
            </button>
            <p>A little bit</p>
          </label>

          <label
            className='group'
            onMouseEnter={this.setHover.bind(this, 1)}
            onMouseLeave={this.removeHover}
            onClick={this.setImportance.bind(this, 'moderate')}
          >
            <button
              className={'importance-button ' + this.hovered[1]}
            >
            </button>
            <p>Moderate</p>
          </label>

          <label
            className='group'
            onMouseEnter={this.setHover.bind(this, 2)}
            onMouseLeave={this.removeHover}
            onClick={this.setImportance.bind(this, 'very')}
          >
            <button
              className={'importance-button ' + this.hovered[2]}
            >
            </button>
            <p>Dealbreaker</p>
          </label>
        </section>
      );
    } else {
      /// when a value has been selected
      return (
        <section className='importanceButtons group'>
          <label
            className='group'
            onClick={this.setImportance.bind(this, 'not-very')}
          >
            <button
              className={'importance-button ' + this.hovered[0]}
            >
            </button>
            <p>A little bit</p>
          </label>

          <label
            className='group'
            onClick={this.setImportance.bind(this, 'moderate')}
          >
            <button
              className={'importance-button ' + this.hovered[1]}
            >
            </button>
            <p>Moderate</p>
          </label>

          <label
            className='group'
            onClick={this.setImportance.bind(this, 'very')}
          >
            <button
              className={'importance-button ' + this.hovered[2]}
            >
            </button>
            <p>Dealbreaker</p>
          </label>
        </section>
      );
    }
  },


  renderDesiredChoicesList: function () {
    var questionBundle = this.state.questionBundle;
    var questionChoices = questionBundle.question_choices;
    var selectedAnswer = this.state.selectedDesire;
    var result = [];
    var buttonType = <i className="fa fa-square-o" aria-hidden="true"></i>;
    var selectedButtonType =
      <i className="fa fa-check-square-o" aria-hidden="true"></i>;
    var indexCounter = 0;

    questionChoices.forEach(function (choice, index) {
      if (selectedAnswer !== [] &&
          selectedAnswer.indexOf(choice.choice_string) !== -1) {
        result.push(
          <button
            key={index}
            className='choice-button'
            onClick={this.toggleDesiredSelect}
            value={choice.choice_string}
          >
            {selectedButtonType}
            <span>{choice.choice_string}</span>
          </button>
        );
      } else {
        result.push(
          <button
            key={index}
            className='choice-button'
            onClick={this.toggleDesiredSelect}
            value={choice.choice_string}
          >
            {buttonType}
            <span>{choice.choice_string}</span>
          </button>
        );
      }

      indexCounter = index;
    }.bind(this));

    if (selectedAnswer.indexOf('any') !== -1) {
      result.push(
        <button
          key={indexCounter+1}
          className='choice-button'
          onClick={this.toggleDesiredSelect}
          value='any'
        >
          {selectedButtonType}
          <span>Any of the above</span>
        </button>
      );
    } else {
      result.push(
        <button
          key={indexCounter+1}
          className='choice-button'
          onClick={this.toggleDesiredSelect}
          value='any'
        >
          {buttonType}
          <span>Any of the above</span>
        </button>
      );
    }

    return result;
  },

  renderAnswerChoiceList: function () {
    var questionBundle = this.state.questionBundle;
    var questionChoices = questionBundle.question_choices;
    var selectedAnswer = this.state.selectedAnswer;
    var result = [];
    var buttonType;
    var selectedButtonType;

    if (questionBundle.question.multi_select) {
      buttonType = <i className="fa fa-square-o" aria-hidden="true"></i>;
      selectedButtonType =
        <i className="fa fa-check-square-o" aria-hidden="true"></i>;
    } else {
      buttonType = <i className="fa fa-circle-o" aria-hidden="true"></i>;
        selectedButtonType =
          <i className="fa fa-check-circle-o" aria-hidden="true"></i>;
    }

    questionChoices.forEach(function (choice, index) {
      if (selectedAnswer !== [] &&
          selectedAnswer.indexOf(choice.choice_string) !== -1) {
        result.push(
          <button
            key={index}
            className='choice-button'
            onClick={this.toggleSelect}
            value={choice.choice_string}
          >
            {selectedButtonType}
            <span>{choice.choice_string}</span>
          </button>
        );
      } else {
        result.push(
          <button
            key={index}
            className='choice-button'
            onClick={this.toggleSelect}
            value={choice.choice_string}
          >
            {buttonType}
            <span>{choice.choice_string}</span>
          </button>
        );
      }
    }.bind(this));

    return result;
  },

  render: function() {
    var questionBundle = this.state.questionBundle;

    if (questionBundle) {
      var question = questionBundle.question;

      var questionChoices = questionBundle.question_choices;

      if (this.state.questionFormRendered) {

        // the form for answering the question
        return (
          <section id='question-item'>
            <h2>{questionBundle.question.content}</h2>

            <ul>
              {this.renderAnswerChoiceList()}
            </ul>

            <h2>Answers(s) you'll accept</h2>

            <ul>
              {this.renderDesiredChoicesList()}
            </ul>

            <h2>Importance</h2>
            {this.renderImportanceButtons()}

            <textarea
              placeholder='Explain your answer (optional)'
              onChange={this.handleExplanationEntry}
              defaultValue={this.state.explanation}
            >
            </textarea>

            <button
              className='answer-button'
              onClick={this.handleSubmit}
            >
              Submit
            </button>

            <button
              className='cancel-button'
              onClick={this.handleCancel}
            >
              Cancel
            </button>

            <button
              className='skip-button'
              onClick={this.handleSkipQuestion}
            >
              Skip Question
            </button>

          </section>
        );
      } else if (!this.state.questionFormRendered) {
        if (questionBundle.question === 'no more questions') {
          return (
            <section id='question-item'>
              <h1>No more questions to answer</h1>
              <p>Look at you go!</p>
            </section>
          );
        } else {
          // the random question
          return (
            <section id='question-item'>
              <h1>{questionBundle.question.content}</h1>

              <button
                className='answer-button'
                onClick={this.handleAnswerClick}
                >
                Answer
              </button>

              <button
                className='skip-button'
                onClick={this.handleSkipQuestion}
                >
                Skip Question
              </button>
            </section>
          );
        }
      }
    } else {
      return (<div />);
    }
  }

});

module.exports = QuestionItem;
