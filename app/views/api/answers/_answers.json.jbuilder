json.array! @answers do |answer|
  json.extract! answer, :question, :question_choices, :chosen_ids,
                        :acceptable_ids, :importance
end
