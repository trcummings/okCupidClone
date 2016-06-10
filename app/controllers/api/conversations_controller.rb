class Api::ConversationsController < ApplicationController
  def index
    @convos = Conversation.all.where(sender_id: current_user.id)

    render 'api/conversations/index'
  end


  def create
    receiver = User.find_by(username: params[:other_user][:username])

    @convo = Conversation.new(
        sender_id: current_user.id,
        receiver_id: receiver.id,
        conversation_name: current_user.username + " " + params[:other_user][:username]
      )

    if @convo.save
      render 'api/conversations/show'
    else
      render json: { base: ["Sumthin wrong"] }, status: 401
    end
  end

  # def show
  #   receiver = User.find_by(username: params[:username])
  #   @convo = Conversation
  #     .where(sender_id: [current_user.id, receiver.id])
  #     .where(receiver_id: [receiver.id, current_user.id])
  #
  #   if @convo
  #     render 'api/conversations/show'
  #   else
  #     render json: { base: ["No conversation found!"] }, status: 401
  #   end
end
