class Api::SessionsController < ApplicationController
  def create
    # actual login
    @user = User.find_by_credentials(
      params[:username],
      params[:password]
    )

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
      render json: @user
    else
      render json: {}
    end
  end

  def destroy
    # logout
    log_out!
    render json: {}
    # redirect_to root_path
  end
end
