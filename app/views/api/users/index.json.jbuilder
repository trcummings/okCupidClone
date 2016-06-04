# json.array! @users, :id, :username, :birth_date, :location, :gender
# if @user.photos.length > 0
#   json.photo_url @user.default_photo_url
# end

json.array! @users, :id, :username, :birth_date, :location, :gender, :default_photo_url
