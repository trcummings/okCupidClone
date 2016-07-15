class AddImagesToUserPhotosAgain < ActiveRecord::Migration
  def up
    add_attachment :user_photos, :image
  end
end
