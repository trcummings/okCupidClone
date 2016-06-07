class Api::LikesController < ApplicationController
  def create
    @like = Like.create(
      liker_id: current_user.id,
      likee_id: params[:user_id]
    )

    render json: @like
  end

  def destroy
    @like = Like.find_by(
      liker_id: current_user.id,
      likee_id: params[:likee_id]
    )

    @like.destroy

    render json: @like
  end
end
