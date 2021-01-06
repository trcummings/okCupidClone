class AddIsDefaultColumnToUserPhotos < ActiveRecord::Migration[4.2]
  def change
    add_column :user_photos, :is_default, :boolean, default: true
  end
end
