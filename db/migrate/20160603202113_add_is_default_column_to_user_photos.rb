class AddIsDefaultColumnToUserPhotos < ActiveRecord::Migration
  def change
    add_column :user_photos, :is_default, :boolean, default: true
  end
end
