class Api::UsersController < ApplicationController
  def index
    @users = User.all

    render '/api/users/index'
  end


  def create
    birth_date = params[:user][:birth_date]
    date_parts = JSON.parse(birth_date)
    params[:user][:birth_date] = Date.new(
      date_parts['yyyy'].to_i,
      date_parts['mm'].to_i,
      date_parts['dd'].to_i
    )

    params[:user][:zip_code] = params[:user][:zip_code].to_i

    @user = User.new(user_params)
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

  private
  def user_params
    params.require(:user).permit(
      :username,
      :password,
      :email,
      :birth_date,
      :country,
      :zip_code,
      :location,
      :orientation,
      :gender
    )
  end
end
