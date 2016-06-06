class AddDetailsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :ethnicity, :string
    add_column :users, :status, :string
    add_column :users, :relationship_type, :string
    add_column :users, :height, :string
    add_column :users, :body_type, :string
    add_column :users, :diet, :string
    add_column :users, :smoking, :string
    add_column :users, :drinking, :string
    add_column :users, :drugs, :string
    add_column :users, :sign, :string
    add_column :users, :education, :string
    add_column :users, :offspring, :string
    add_column :users, :pets, :string
    add_column :users, :speaks, :string
  end
end
