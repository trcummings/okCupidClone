class Api::UserPhotosController < ApplicationController
  # def index
  #   @user = User.find_by(id: current_user.id)
  #   @photos = @user.photos
  #
  #   render json: @photos
  # end

  # def create
  #   @photo = UserPhoto.new(
  #     user_id: current_user.id,
  #     photo_url: photo_params[:photo_url],
  #     public_id: photo_params[:public_id]
  #   )
  #
  #   if @photo.save
  #     current_user.undefault_other_photos(@photo.id)
  #
  #     render json: @photo
  #   else
  #     render json: { base: ["Sumthin wrong"] }, status: 401
  #   end
  # end

  # def show
  #   @user = User.find_by(id: params[:user_id])
  #   @photos = @user.photos
  #
  #   render 'api/user_photos/show'
  # end
  #
  # def destroy
  # end
  #
  # private
  # def photo_params
  #   params.require(:user_photo).permit(:photo_url, :description, :public_id)
  # end
  #
  # def other_user_photo_params
  #   params.require(:user_photo).permit(:user_id)
  # end
end
