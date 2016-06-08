json.array! photos do |photo|
  json.extract! photo, :photo_url, :description, :is_default
end
