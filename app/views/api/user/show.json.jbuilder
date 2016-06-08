json.extract! @user, :username, :age, :country, :location, :orientation, :gender

json.photos do
  json.partial! 'api/user_photos/photos', photos: @user.photos
end

json.about do
  json.partial! 'api/user_abouts/about', about: @user.about
end

json.likers do
  json.partial! 'api/user/users', users: @user.likers
end

json.likees do
  json.partial! 'api/user/users', users: @user.likees
end

json.mutual_likes do
  json.partial! 'api/user/users', users: @user.mutual_likes
end

json.answers do
  json.partial! 'api/answers/answers', answers: @user.answers
end

# json.partial! 'likers/likers', likers: @user.likers
# json.partial! 'likees/likees', likees: @user.likees
# json.partial! 'answers/answers', answers: @user.answers
# json.partial! 'mutual_likes/mutual_likes', mutual_likes: @user.mutual_likes


# json.extract! @user,
#   :username, :email, :birth_date, :country, :location, :orientation, :gender
# if @user.photos.length > 0
#   json.photo_url @user.default_photo_url
# end

# if @user.about
#   json.about @user.about.return_safe_data
# end
#
# if @user.likers
#   json.likers @user.likers
# end
#
# if @user.likees
#   json.likees @user.likees
# end
#
# if @user.answers
#   json.answers @user.answers
# end
#
# if @user.mutual_likes
#   json.mutualLikes @user.mutual_likes do |like|
#     json.default_photo_url like.default_photo_url
#     json.birth_date like.birth_date
#     json.username like.username
#     json.gender like.gender
#     json.location like.location
#     json.orientation like.orientation
#     json.country like.country
#     json.match_percentage @user.match_percentage(like.username)
#   end
# end
