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
    @user.birth_date = Date.new(*date_params)

    if @user.update(user_params)
      render '/api/user/show'
    else
      render json: { base: ["Sumthin wrong"] }, status: 401
    end
  end

  def check_email_uniqueness
    # note to self: this is kind of unsafe. Anyone could check if someone has
    # an email registered here, and that's not good.

    user = User.find_by(email: params[:email])

    if user
      render json: true
    else
      render json: false
    end
  end

  def check_username_uniqueness
    user = User.find_by(username: params[:username])

    if user
      render json: true
    else
      render json: false
    end
  end


  #### ABOUTS

  def get_about
    @user_about = UserAbout.find_by(user_id: current_user.id)

    render '/api/user_abouts/show'
  end

  def update_about
    @user_about = UserAbout.find_by(user_id: current_user.id)
    @user_about.update(about_params)

    render '/api/user_abouts/show'
  end

  def other_user_about
    @user = User.find_by(username: params[:username])
    @user_about = UserAbout.find_by(user_id: @user.id)

    render '/api/user_abouts/show'
  end


  #### ANSWERS

  def get_all_answers
    @user = User.find(current_user.id)
    @answers = @user.answers.includes(:question, :question_choices)

    render 'api/answers/index'
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
    @photo = UserPhoto.new(user_id: current_user.id)

    if @photo.save
      @photo.image = photo_params[:image]
      @photo.save!
      # current_user.undefault_other_photos(@photo.id)
      current_user.undefault_other_photos

      render 'api/user_photos/show'
    else
      render json: { base: ["Sumthin wrong"] }, status: 401
    end
  end

  def all_photos
    @user = User.find_by(id: current_user.id)
    @photos = @user.photos

    render 'api/user_photos/index'
  end

  def update_photo_description
    @photo = UserPhoto.find_by(id: photo_params[:photo_id])
    @photo.description = photo_params[:description]

    if @photo.save
      render 'api/user_photos/show'
    else
      render json: { base: ["Sumthin wrong"] }, status: 401
    end
  end

  def other_user_photos
    @user = User.find_by(username: params[:username])
    @photos = @user.photos

    render 'api/user_photos/index'
  end

  def delete_photo
    @photo = UserPhoto.find(params[:photo_id])

    if @photo.is_default
      @photo.destroy
      current_user.photos.first.is_default = true
    else
      @photo.destroy
    end

    render 'api/user_photos/show'
  end

  def default_photo
    photo = UserPhoto.find(params[:photo_id])
    # current_user.undefault_other_photos(photo.id)
    current_user.undefault_other_photos
    photo.is_default = true
    photo.save!

    render json: params[:photo_id]
  end



  ## Messages


  def get_conversation
    receiver = User.find_by(username: params[:username])
    @convo = User.get_convo(current_user.id, receiver.id)

    if @convo.valid?
      render 'api/conversations/show'
    else
      render json: { base: ["No conversation found!"] }, status: 401
    end
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
    params.require(:photo).permit(:image, :photo_id, :description)
  end

  def other_user_photo_params
    params.require(:user_photo).permit(:username)
  end
end
