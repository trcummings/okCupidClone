class RemovePublicIdFromUserPhotos < ActiveRecord::Migration[4.2]
  def change
    remove_column :user_photos, :public_id
  end
end
