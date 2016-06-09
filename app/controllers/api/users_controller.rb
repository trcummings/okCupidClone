class Api::UsersController < ApplicationController

  #### USER && USERS

  def all_other_users
    @users = User.all

    render '/api/users/index'
  end

  def get_user
    @user = User.find(current_user.id)

    if @user
      render '/api/user/show'
    else
      render json: { base: ["User not found!"] }, status: 404
    end
  end

  def other_user
    @user = User.find_by(username: params[:username])

    if @user
      render '/api/users/show'
    else
      render json: { base: ["User not found!"] }, status: 404
    end
  end

  def create_user
    @user = User.new(user_params)
    @user.birth_date = Date.new(*date_params)

    if @user.save
      UserAbout.create(user_id: @user.id)
      log_in!(@user)
      render '/api/user/show'
    else
      render json: @user.errors, status: 422
    end
  end

  def get_birthdate
    render json: current_user.birth_date
  end

  def update_user
    @user = current_user
    @user.birth_date = params[:user][:birth_date]
    if @user.update(user_params)
      render '/api/user/show'
    else
      render json: { base: ["Sumthin wrong"] }, status: 401
    end
  end


  #### ABOUTS

  def get_about
    @user_about = UserAbout.find_by(user_id: current_user.id)

    render '/api/user/about/show'
  end

  def update_about
    @user_about = UserAbout.find_by(user_id: current_user.id)
    @user_about.update(about_params)

    render '/api/user/about/show'
  end

  def other_user_about
    @user = User.find_by(username: params[:username])
    @user_about = UserAbout.find_by(user_id: @user.id)

    render '/api/users/about/show'
  end


  #### ANSWERS

  def get_all_answers
    @user = User.find(current_user.id)
    @answers = @user.answers

    render 'api/user/answers'
  end

  # def delete_all_answers
  #   @user = User.find(current_user.id)
  #   @user.answers.destroy_all
  #
  #   render 'api/user/answers'
  # end

  # def other_user_answers
  #
  # end


  #### PHOTOS

  def add_photo
    @photo = UserPhoto.new(
      user_id: current_user.id,
      photo_url: photo_params[:photo_url],
      public_id: photo_params[:public_id]
    )

    if @photo.save
      current_user.undefault_other_photos(@photo.id)

      render 'api/user/photos'
    else
      render json: { base: ["Sumthin wrong"] }, status: 401
    end
  end


  def all_photos
    @user = User.find_by(id: current_user.id)
    @photos = @user.photos

    render 'api/user/photos'
  end


  def other_user_photos
    @user = User.find_by(username: params[:username])
    @photos = @user.photos

    render 'api/users/photos/show'
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

  def about_params
    params.require(:about).permit(
      :self_summary,
      :doing_with_life,
      :really_good_at,
      :favorite_things,
      :six_things,
      :thinking_about,
      :typical_friday,
      :message_me_if
    )
  end

  def photo_params
    params.require(:user_photo).permit(:photo_url, :description, :public_id)
  end

  def other_user_photo_params
    params.require(:user_photo).permit(:username)
  end
end
