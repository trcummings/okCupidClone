# == Schema Information
#
# Table name: messages
#
#  id         :integer          not null, primary key
#  user_1_id  :integer          not null
#  user_2_id  :integer          not null
#  content    :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Message < ActiveRecord::Base
  validates :user_1_id, :user_2_id, :content

  belongs_to(
    :sender,
    class_name: 'User',
    foreign_key: :user_1_id,
    primary_key: :id
  )

  belongs_to(
    :receiver,
    class_name: "User",
    foreign_key: :user_2_id,
    primary_key: :id
  )

  def self.chat_history(user1id, user2id)
    Message
      .select(:content)
      .where("(user_1_id = ? AND user_2_id = ? ) OR (user_2_id = ? AND user_1_id = ?)", user1id, user2id)
      .uniq
  end
end
