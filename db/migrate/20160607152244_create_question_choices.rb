class CreateQuestionChoices < ActiveRecord::Migration[4.2]
  def change
    create_table :question_choices do |t|
      t.integer :question_id, null: false
      t.string :choice_string, null: false

      t.timestamps null: false
    end
  end
end
