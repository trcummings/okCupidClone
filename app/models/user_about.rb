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

  def return_safe_data
    {
      self_summary: self.self_summary,
      doing_with_life:  self.doing_with_life,
      really_good_at: self.really_good_at,
      favorite_things: self.favorite_things,
      six_things: self.six_things,
      thinking_about: self.thinking_about,
      typical_friday: self.typical_friday,
      message_me_if:  self.message_me_if
    }
  end
end
