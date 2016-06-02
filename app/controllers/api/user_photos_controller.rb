class Api::UserPhotosController < ApplicationController
  def index
    @user = User.find_by(id: current_user.id)
    @photos = @user.photos

    render json: @photos
  end

  def create
    @photo = UserPhoto.new(
      user_id: current_user.id,
      photo_url: photo_params[:photo_url]
    )

    if @photo.save
      render json: @photo
    else
      render json: { base: ["Sumthin wrong"] }, status: 401
    end
  end

  def show
  end

  def destroy
  end

  private
  def photo_params
    params.require(:user_photo).permit(:photo_url, :description)
  end
end
