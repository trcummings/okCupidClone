# == Schema Information
#
# Table name: questions
#
#  id           :integer          not null, primary key
#  content      :string           not null
#  multi_select :boolean          default(FALSE), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'test_helper'

class QuestionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
