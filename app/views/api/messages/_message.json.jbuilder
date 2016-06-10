json.extract! message, :content, :receiver_id, :conversation

json.sender message.sender.username
json.receiver message.receiver.username
