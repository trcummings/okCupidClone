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

class Question < ActiveRecord::Base
  validates :content, presence: true

  has_many(
    :question_choices,
    class_name: 'QuestionChoice',
    foreign_key: :question_id,
    primary_key: :id
  )

  def self.random_question
    Question.all.sample
  end
end
