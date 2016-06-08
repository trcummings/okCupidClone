class Api::LikesController < ApplicationController
  def create
    @user = User.find_by(username: params[:username])
    @like = Like.create(
      liker_id: current_user.id,
      likee_id: @user.id
    )

    render json: @like
  end

  def destroy
    @user = User.find_by(username: params[:username])
    @like = Like.find_by(
      liker_id: current_user.id,
      likee_id: @user.id
    )

    @like.destroy

    render json: @like
  end
end
