var React = require('react');
var PropTypes = React.PropTypes;
var QuestionItem = require('./questionItem');

var ProfileQuestionsTab = React.createClass({

  render: function() {
    return (
      <div id='questions_tab'>
        <QuestionItem />
      </div>
    );
  }

});

module.exports = ProfileQuestionsTab;
