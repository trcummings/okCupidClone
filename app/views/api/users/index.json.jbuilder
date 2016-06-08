# json.array! @users, :id, :username, :birth_date, :location, :gender
# if @user.photos.length > 0
#   json.photo_url @user.default_photo_url
# end

json.array! @users do |user|
  json.username user.username
  json.birth_date user.birth_date
  json.location user.location
  json.gender user.gender
  json.default_photo_url user.default_photo_url
  json.matchPercentage user.match_percentage(current_user.username)
end
