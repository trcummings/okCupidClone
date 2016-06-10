json.extract! convo, :conversation_name, :receiver_id, :messages

json.sender convo.sender.username
json.receiver convo.receiver.username
