json.extract! user, :username, :age, :country,
                    :location, :orientation,
                    :gender, :default_photo_url
                    
json.match_percentage user.match_percentage(current_user.username)
