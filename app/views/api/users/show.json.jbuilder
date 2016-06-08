json.extract! @user,
  :username, :age, :country, :location, :orientation, :gender, :default_photo_url

# if @user.photos.length > 0
#   json.photo_url @user.default_photo_url
# end
