json.extract! answer, :chosen_ids, :acceptable_ids,
  :importance, :explanation, :question_choices
json.content answer.question.content
json.multi_select answer.question.multi_select
json.question_id answer.question.id
