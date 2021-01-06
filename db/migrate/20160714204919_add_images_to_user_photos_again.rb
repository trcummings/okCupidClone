class AddImagesToUserPhotosAgain < ActiveRecord::Migration[4.2]
  def up
    add_attachment :user_photos, :image
  end
end
