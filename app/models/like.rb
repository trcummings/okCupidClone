# == Schema Information
#
# Table name: likes
#
#  id         :integer          not null, primary key
#  liker_id   :integer          not null
#  likee_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Like < ActiveRecord::Base
  validates :liker_id, :likee_id, presence: true
  validates :liker_id, uniqueness: { scope: :likee_id }
  validates :likee_id, uniqueness: { scope: :liker_id }

  belongs_to(
    :liker,
    class_name: "User",
    foreign_key: :liker_id,
    primary_key: :id
  )

  belongs_to(
    :likee,
    class_name: "User",
    foreign_key: :likee_id,
    primary_key: :id
  )

  def self.mutual_like?(id1, id2)
  end
end
