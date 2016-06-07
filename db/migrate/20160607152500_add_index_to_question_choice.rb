class AddIndexToQuestionChoice < ActiveRecord::Migration
  def change
    add_index :question_choices, :question_id
  end
end
