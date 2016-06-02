class CreateUserPhotos < ActiveRecord::Migration
  def change
    create_table :user_photos do |t|
      t.integer :user_id, null: false
      t.string :photo_url, null: false
      t.string :description

      t.timestamps null: false
    end
    add_index :user_photos, :user_id
  end
end
