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
#  is_default  :boolean          default(TRUE)
#  public_id   :string           not null
#

class UserPhoto < ActiveRecord::Base
  validates :user_id, :photo_url, :public_id, presence: true

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
  end

end
