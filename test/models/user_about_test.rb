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

require 'test_helper'

class UserAboutTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
