json.array! users do |user|
  json.extract! user, :username, :age, :country,
                      :location, :orientation,
                      :gender, :default_photo_url
end
