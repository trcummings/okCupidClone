class Api::ConversationsController < ApplicationController
  def index
    @convos =
      Conversation.where(
        'sender_id = ? OR receiver_id = ?',
        current_user.id, current_user.id
      )

    render 'api/conversations/index'
  end


  def create
    receiver = User.find_by(username: params[:other_user][:username])

    @convo = Conversation.new(
        sender_id: current_user.id,
        receiver_id: receiver.id,
        conversation_name: current_user.username + "_" + params[:other_user][:username]
      )

    if @convo.save
      Pusher.trigger(@convo.conversation_name, 'convo_created', {})

      render 'api/conversations/show'
    else
      render json: { base: ["Sumthin wrong"] }, status: 401
    end
  end
end
