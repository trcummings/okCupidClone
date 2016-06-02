# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create!(
  username: 'gemp',
  password: 'password',
  email: 'gemp@denp.com',
  birth_date: Date.new(1992, 05, 14),
  country: 'America',
  zip_code: 19027,
  location: 'Elkins Park',
  gender: 'Anime Enthusiast',
  orientation: 'Sapiosexual'
)

User.create!(
  username: "dimp",
  password: 'password',
  email: "dimp@demp.com",
  birth_date: Date.new(1990, 11, 13),
  country: "America",
  zip_code: 19119,
  location: "Philadelphia",
  gender: "Woman",
  orientation: "Gay">
)
