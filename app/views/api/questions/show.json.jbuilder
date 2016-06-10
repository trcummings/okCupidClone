if @question == 'no more questions'
  json.question 'no more questions'
else
  json.question @question
  json.question_choices @question.question_choices
end
