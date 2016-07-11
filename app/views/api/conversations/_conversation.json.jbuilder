json.conversation_name convo.conversation_name

 json.messages convo.messages.includes(:sender, :receiver) do |msg|
   json.content msg.content
   json.sender msg.sender.username
   json.receiver msg.receiver.username
 end

json.sender convo.sender.username
json.receiver convo.receiver.username
