# == Schema Information
#
# Table name: answers
#
#  id             :integer          not null, primary key
#  user_id        :integer          not null
#  question_id    :integer          not null
#  chosen_ids     :string           not null, is an Array
#  acceptable_ids :string           not null, is an Array
#  importance     :integer          not null
#  explanation    :text
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

require 'test_helper'

class AnswerTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
