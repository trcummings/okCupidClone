json.extract! @user, :username, :age, :country, :location, :orientation, :gender

json.photos do
  json.partial! 'api/user_photos/photos', photos: @user.photos
end

json.about do
  json.partial! 'api/user_abouts/about', about: @user.about
end

json.likers do
  json.partial! 'api/users/users', users: @user.likers
end

json.likees do
  json.partial! 'api/users/users', users: @user.likees
end

json.mutual_likes do
  json.partial! 'api/users/users', users: @user.mutual_likes
end

json.answers do
  json.partial! 'api/answers/answers', answers: @user.answers
end

json.conversations do
  json.partial! 'api/conversations/conversations', convos: @user.conversations
end
