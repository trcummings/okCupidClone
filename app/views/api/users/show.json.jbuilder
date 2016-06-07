json.extract! @user,
  :id, :username, :email, :birth_date, :country, :location, :orientation, :gender
if @user.photos.length > 0
  json.photo_url @user.default_photo_url
end

if @user.about
  json.about @user.about.return_safe_data
end

if @user.people_who_liked_this_user
  json.people_who_liked_this_user @user.people_who_liked_this_user
end

if @user.people_this_user_liked
  json.people_this_user_liked @user.people_this_user_liked
end
