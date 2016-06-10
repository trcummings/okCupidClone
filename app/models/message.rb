# == Schema Information
#
# Table name: messages
#
#  id              :integer          not null, primary key
#  sender_id       :integer          not null
#  receiver_id     :integer          not null
#  content         :text             not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  conversation_id :integer
#

class Message < ActiveRecord::Base
  validates :content, :conversation_id, :sender_id, :receiver_id, presence: true

  belongs_to(
    :sender,
    class_name: 'User',
    foreign_key: :sender_id,
    primary_key: :id
  )

  belongs_to(
    :receiver,
    class_name: "User",
    foreign_key: :receiver_id,
    primary_key: :id
  )

   belongs_to(
    :conversation,
    class_name: "Conversation",
    foreign_key: :conversation_id,
    primary_key: :id
  )
end
