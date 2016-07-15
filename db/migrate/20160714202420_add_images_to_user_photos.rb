class AddImagesToUserPhotos < ActiveRecord::Migration
  def up
    add_attachment :user_photos, :image
  end

  def down
    remove_attachment :user_photos, :image
  end

  def change
    remove_column :user_photos, :photo_url
  end
end
