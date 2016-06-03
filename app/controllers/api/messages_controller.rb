class Api::MessagesController < ApplicationController
  def create
    message = Message.new()

    if message.save
      Pusher.trigger(
        'conversation_between' + current_user.username +
        "and" + receiver.username,
        'message_sent',
        {
          message: params[:message][:content]
        }
      )
      render json: message
    else
      
    end
  end

  private
  def message_params
    params.require(:message).permit(:receiver_id, :content, )
end
