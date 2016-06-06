json.extract! @user,
  :id, :username, :email, :birth_date, :country, :location, :orientation, :gender
if @user.photos.length > 0
  json.photo_url @user.default_photo_url
end
