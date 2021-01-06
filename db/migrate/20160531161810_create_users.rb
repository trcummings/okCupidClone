class CreateUsers < ActiveRecord::Migration[4.2]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :email, null: false
      t.date :birth_date, null: false
      t.string :country, null: false
      t.integer :zip_code, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :location, null: false
    end

    add_index :users, :username
    add_index :users, :email
  end
end
