# == Schema Information
#
# Table name: question_choices
#
#  id            :integer          not null, primary key
#  question_id   :integer          not null
#  choice_string :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

require 'test_helper'

class QuestionChoiceTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
