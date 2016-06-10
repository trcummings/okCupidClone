class Api::MessagesController < ApplicationController
  def create
    @message = Message.new(message_params)
    @message.sender_id = current_user.id
    conversation = User.get_convo(current_user.id, message_params[:receiver_id])
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
    params.require(:message).permit(:sender_id, :receiver_id, :content)
  end
end
