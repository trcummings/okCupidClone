# == Schema Information
#
# Table name: user_photos
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  photo_url   :string           not null
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class UserPhoto < ActiveRecord::Base
  validates :user_id, :photo_url, presence: true

  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  )
end
