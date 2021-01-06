class AddGenderAndOrientationToUsers < ActiveRecord::Migration[4.2]
  def change
    add_column :users, :gender, :string
    change_column :users, :gender, :string, null: false
    add_column :users, :orientation, :string
    change_column :users, :orientation, :string, null: false
  end
end
