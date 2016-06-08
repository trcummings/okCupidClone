json.array! @answers do |answer|
  json.extract! answer.question, :content
  json.chosen_ids answer.chosen_ids
  json.acceptable_ids answer.acceptable_ids
  json.importance answer.importance
  if answer.explanation
    json.explanation answer.explanation
  end
  json.answerChoices answer.question_choices do |choice|
    json.extract! choice, :id, :choice_string
  end
end
