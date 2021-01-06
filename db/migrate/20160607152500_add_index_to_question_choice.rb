class AddIndexToQuestionChoice < ActiveRecord::Migration[4.2]
  def change
    add_index :question_choices, :question_id
  end
end
