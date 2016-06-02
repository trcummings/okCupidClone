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

require 'test_helper'

class UserPhotoTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
