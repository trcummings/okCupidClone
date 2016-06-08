# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all
UserAbout.destroy_all
Question.destroy_all
QuestionChoice.destroy_all

thomsen = User.create!(
  username: 'trcummings',
  password: 'password',
  email: 'thomsencummings@gmail.com',
  birth_date: Date.new(1992, 10, 14),
  country: 'America',
  zip_code: 11221,
  location: 'Brooklyn, NY',
  gender: 'Anime Enthusiast',
  orientation: 'Sapiosexual'
)

UserAbout.create!(
  user_id: thomsen.id
)

UserPhoto.create!(
  photo_url: 'http://s3-us-west-2.amazonaws.com/aa-progress-tracker/students/avatars/000/001/198/medium/Thomsen_Cummings.jpg?1460493868',
  user_id: thomsen.id,
  is_default: true,
  public_id: 'ghhh'
)


kojima = User.create!(
  username: 'bigboss69',
  password: 'password',
  email: 'kojima@gmail.com',
  birth_date: Date.new(1963, 8, 24),
  country: 'America',
  zip_code: 11221,
  location: 'Brooklyn, NY',
  gender: 'Man',
  orientation: 'Straight'
)

UserAbout.create!(
  user_id: kojima.id
)

UserPhoto.create!(
  photo_url: 'http://vrworld.com/wp-content/uploads/2015/03/Hideo-Kojima.jpg',
  user_id: kojima.id,
  is_default: true,
  public_id: 'hggh'
)





q1 = Question.create!(
  content: 'Could you date someone who was really messy?',
  multi_select: false
)

  QuestionChoice.create!(
    question_id: q1.id,
    choice_string: 'I myself, am a filthy hog as well'
  )

  QuestionChoice.create!(
    question_id: q1.id,
    choice_string: 'The sight of garbage fills me with dark intents and vile fluids'
  )



q2 = Question.create!(
  content: "Fedoras on men?",
  multi_select: true
)

  QuestionChoice.create!(
    question_id: q2.id,
    choice_string: "Classy to the maxy"
  )

  QuestionChoice.create!(
    question_id: q2.id,
    choice_string: "He better have the jorts to match"
  )

  QuestionChoice.create!(
    question_id: q2.id,
    choice_string: "I've seen hell, and uh, that's hell, buddy"
  )

  QuestionChoice.create!(
    question_id: q2.id,
    choice_string: "I don't judge people by their decision to wear a fucking hat"
  )


q3 = Question.create!(
  content: "In a certain light, wouldn't nuclear war be pretty sweet?",
  multi_select: true
)

  QuestionChoice.create!(
    question_id: q3.id,
    choice_string: "Nah tho"
  )

  QuestionChoice.create!(
    question_id: q3.id,
    choice_string: "I'm in if I can still get WiFi"
  )

  QuestionChoice.create!(
    question_id: q3.id,
    choice_string: "A little bit...I've always fancied a bit of water barony and indiscriminate murder"
  )

  QuestionChoice.create!(
    question_id: q3.id,
    choice_string: "I AM A BARBARIAN GOD. I AM THE BLOOD WHICH ENDS ALL BLOOD."
  )
