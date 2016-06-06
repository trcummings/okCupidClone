class Api::UsersController < ApplicationController
  def index
    @users = User.all

    render '/api/users/index'
  end


  def create
    @user = User.new(user_params)
    @user.birth_date = Date.new(*date_params)

    if @user.save
      log_in!(@user)
      render '/api/users/show'
    else
      render json: @user.errors, status: 422
    end
  end

  def show
    @user = User.find_by(username: params[:username])

    if @user
      render '/api/users/show'
    else
      render json: { base: ["User not found!"] }, status: 404
    end
  end

  def update

  end

  private
  def user_params
    params.require(:user).permit(
      :username,
      :password,
      :email,
      :country,
      :zip_code,
      :location,
      :orientation,
      :gender
    )
  end

  def date_params
    params
      .require(:user)
      .require(:birth_date)
      .permit(:yyyy, :mm, :dd)
      .values
      .map(&:to_i)
  end
end
