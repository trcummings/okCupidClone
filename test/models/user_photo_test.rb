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
#  public_id          :string           not null
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

require 'test_helper'

class UserPhotoTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
