class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.integer :user_id, null: false
      t.integer :question_id, null: false
      t.string :chosen_ids, array: true, null: false
      t.string :acceptable_ids, array: true, null: false
      t.integer :importance, null: false
      t.text :explanation

      t.timestamps null: false
    end

    add_index :answers, :user_id
    add_index :answers, :question_id
  end
end
