class Api::UserAboutsController < ApplicationController
  def show
    @user_about = UserAbout.find_by(user_id: params[:user_id])

    render '/api/user_abouts/show'
  end

  def update
    @user_about = UserAbout.find_by(user_id: current_user.id)
    @user_about.update(params)

    render '/api/user_abouts/show'
  end
end
