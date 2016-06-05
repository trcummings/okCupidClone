class AddPublicIdToUserPhotos < ActiveRecord::Migration
  def change
    add_column :user_photos, :public_id, :string
    change_column :user_photos, :public_id, :string, null: false
  end
end
