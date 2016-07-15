class RemovePublicIdFromUserPhotos < ActiveRecord::Migration
  def change
    remove_column :user_photos, :public_id
  end
end
