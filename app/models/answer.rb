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

class Answer < ActiveRecord::Base
  validates :user_id, :question_id, :chosen_ids,
            :acceptable_ids, :importance, presence: true

  validates :question_id, uniqueness: { scope: :user_id }

  belongs_to(
    :user,
    class_name: 'User',
    foreign_key: :user_id,
    primary_key: :id
  )

  has_many(
    :question_choices,
    through: :question,
    source: :question_choices
  )

  belongs_to(
    :question,
    class_name: "Question",
    foreign_key: :question_id,
    primary_key: :id
  )

  def to_param
    :question_id
  end
end
