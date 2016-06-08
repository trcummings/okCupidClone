class Api::UserAboutsController < ApplicationController
  # def show
  #   @user_about = UserAbout.find_by(user_id: params[:user_id])
  #
  #   render '/api/user_abouts/show'
  # end
  #
  # def update
  #   @user_about = UserAbout.find_by(user_id: current_user.id)
  #   @user_about.update(about_params)
  #
  #   render '/api/user_abouts/show'
  # end
  #
  # def about_params
  #   params.require(:about).permit(
  #     :self_summary,
  #     :doing_with_life,
  #     :really_good_at,
  #     :favorite_things,
  #     :six_things,
  #     :thinking_about,
  #     :typical_friday,
  #     :message_me_if
  #   )
  # end
end
