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

  has_many(
    :answers,
    class_name: "Answer",
    foreign_key: :question_id,
    primary_key: :id
  )

  def self.random_question(user_answers)
    user_questions = []

    user_answers.each do |answer|
      user_questions.push(answer.question)
    end

    potential_questions = Question.includes(:question_choices).all - user_questions

    if potential_questions.length > 0
      potential_questions.sample
    else
      'no more questions'
    end
  end
end
