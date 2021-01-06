# == Schema Information
#
# Table name: user_photos
#
#  id                 :integer          not null, primary key
#  user_id            :integer          not null
#  description        :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  is_default         :boolean          default(TRUE)
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

class UserPhoto < ActiveRecord::Base
  has_one_attached :image
  # validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
  validates :image, content_type: ['image/png', 'image/jpg', 'image/jpeg']

  validates :user_id, presence: true

  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  )

  def to_param
    user_id
  end

  def set_is_default_to_false
    self.is_default = false
    self.save!
  end
end
