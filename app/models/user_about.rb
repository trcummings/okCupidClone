# == Schema Information
#
# Table name: user_abouts
#
#  id              :integer          not null, primary key
#  user_id         :integer          not null
#  self_summary    :text
#  doing_with_life :text
#  really_good_at  :text
#  favorite_things :text
#  six_things      :text
#  thinking_about  :text
#  typical_friday  :text
#  message_me_if   :text
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class UserAbout < ActiveRecord::Base
  validates :user_id, presence: true, uniqueness: true

  belongs_to(
    :user,
    class_name: 'User',
    foreign_key: :user_id,
    primary_key: :id
  )

  def to_param
    user_id
  end
end
