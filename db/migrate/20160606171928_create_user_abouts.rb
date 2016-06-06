class CreateUserAbouts < ActiveRecord::Migration
  def change
    create_table :user_abouts do |t|
      t.integer :user_id, null: false
      t.text :self_summary
      t.text :doing_with_life
      t.text :really_good_at
      t.text :favorite_things
      t.text :six_things
      t.text :thinking_about
      t.text :typical_friday
      t.text :message_me_if

      t.timestamps null: false
    end

    add_index :user_abouts, :user_id
  end
end
