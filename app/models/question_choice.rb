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

class QuestionChoice < ActiveRecord::Base
  validates :question_id, :choice_string, presence: true

  belongs_to(
    :question,
    class_name: 'Question',
    foreign_key: :question_id,
    primary_key: :id
  )

  has_many(
    :question_choices,
    class_name: 'QuestionChoice',
    foreign_key: :question_id,
    primary_key: :id
  )
end
