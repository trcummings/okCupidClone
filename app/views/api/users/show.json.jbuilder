json.extract! @user,
  :id, :username, :email, :birth_date, :country, :location, :orientation, :gender
if @user.photos.length > 0
  json.photo_url @user.default_photo_url
end

if @user.about
  json.about @user.about.return_safe_data
end

if @user.likers
  json.likers @user.likers
end

if @user.likees
  json.likees @user.likees
end
