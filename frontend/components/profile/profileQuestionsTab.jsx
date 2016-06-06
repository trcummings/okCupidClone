var React = require('react');
var PropTypes = React.PropTypes;
var QuestionItem = require('./questionItem');

var ProfileQuestionsTab = React.createClass({

  render: function() {
    return (
      <div id='questions-tab'>
        <QuestionItem />

        <section id='answered-questions'>
          <h2>Show Questions</h2>

          <ul id='answered-list'>
            <li id='question-item'>
              <h1> Question Title </h1>
              <ul id='answer-item'>
                <li className='answered desired'>
                  gghhh i have answored this questioem
                </li>
                <li className='unacceptable'>
                  i will never answar this quem
                </li>
              </ul>
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
            </li>
            <li id='question-item'>
              <h1> Question Title </h1>
                <ul id='answer-item'>
                  <li className='answered acceptable'>
                    ngggh this one two
                  </li>
                  <li className='indifferent'>
                    not this one!!!!
                  </li>
                </ul>
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
            </li>
            <li id='question-item'>
              <h1> Question Title </h1>
                <ul id='answer-item'>
                  <li className='answered desired'>
                    im on a 'roll'
                  </li>
                  <li className='indifferent'>
                    ive never rolled a day in my dog damn life!!
                  </li>
                </ul>
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
            </li>
          </ul>
        </section>
      </div>
    );
  }

});

module.exports = ProfileQuestionsTab;
