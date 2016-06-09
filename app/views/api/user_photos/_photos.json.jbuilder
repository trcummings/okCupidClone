json.array! photos do |photo|
  json.partial! 'api/user_photos/photo', photo: photo
end
