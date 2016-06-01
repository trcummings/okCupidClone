class Api::SessionsController < ApplicationController
  def create
    # actual login

    if params[:username]
      @user = User.find_by_credentials(
        params[:username],
        params[:password],
        'username'
      )
    elsif params[:email]
      @user = User.find_by_credentials(
        params[:email],
        params[:password],
        'email'
      )
    end

    unless @user.nil?
      log_in!(@user)
      render "/api/users/show"
    else
      render json: { base: ["Invalid login creds"] }, status: 401
    end
  end

  def show
    if current_user
      @user = current_user
      render "/api/users/show"
    else
      render json: {}
    end
  end

  def destroy
    log_out!
    render json: {}
  end
end
