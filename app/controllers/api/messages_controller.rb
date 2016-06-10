class Api::MessagesController < ApplicationController
  def create
    sender = User.find_by(username: message_params[:sender])
    receiver = User.find_by(username: message_params[:receiver])

    @message = Message.new()
    @message.sender_id = sender.id
    @message.receiver_id = receiver.id
    @message.content = message_params[:content]
    conversation =
      User.get_convo(sender.id, receiver.id)
    @message.conversation_id = conversation.id

    if @message.save
      # Pusher.trigger(
      #   'conversation_between' + current_user.username +
      #   "and" + receiver.username,
      #   'message_sent',
      #   {
      #     message: params[:message][:content]
      #   }
      # )
      # render json: message

      render 'api/messages/show'
    else
      render json: { base: ["Message Failed To Send"] }, status: 401
    end
  end

  private
  def message_params
    params.require(:message).permit(:sender, :receiver, :content)
  end
end
