class AddImagesToUserPhotos < ActiveRecord::Migration[4.2]
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
