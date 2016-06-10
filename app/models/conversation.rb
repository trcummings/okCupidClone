# == Schema Information
#
# Table name: conversations
#
#  id                :integer          not null, primary key
#  sender_id         :integer          not null
#  receiver_id       :integer          not null
#  conversation_name :string           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class Conversation < ActiveRecord::Base
  validates :sender_id, uniqueness: { scope: :receiver_id }

  has_many(
    :messages,
    class_name: "Message",
    foreign_key: :conversation_id,
    primary_key: :id
  )

  belongs_to(
    :sender,
    class_name: "User",
    foreign_key: :sender_id,
    primary_key: :id
  )

  belongs_to(
    :receiver,
    class_name: "User",
    foreign_key: :receiver_id,
    primary_key: :id
  )
end
