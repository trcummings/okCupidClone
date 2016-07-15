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

girl = User.create!(
  username: 'bigcheesys',
  password: 'password',
  email: 'fakegirlmail@mail.urge',
  birth_date: Date.new(1988, 04, 10),
  country: 'America',
  zip_code: 11221,
  location: 'Brooklyn, NY',
  gender: 'Woman',
  orientation: 'Gay'
)

UserAbout.create!(
  user_id: girl.id
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

#### GUEST ACCOUNT

ok_computer = User.create!(
  username: 'OkComputer',
  password: 'guestuser',
  email: 'fakemail@fake.com',
  birth_date: Date.new(1985, 9, 5),
  country: 'America',
  zip_code: 11221,
  location: 'Brooklyn, NY',
  gender: 'Man',
  orientation: 'Straight'
)

UserAbout.create!(
  user_id: ok_computer.id,
  self_summary: 'im just a fun guy that loves to laugh, go on adventures, just gonna look at your profile for pictures of dogs tbh, i was the second shooter on the grassy knoll',
  doing_with_life: 'i dunno lol',
  really_good_at: ';)',
  six_things: '',
  thinking_about: '',
  typical_friday: '',
  message_me_if: ''
)

#########


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
    choice_string: "No me gusta"
  )

  QuestionChoice.create!(
    question_id: q2.id,
    choice_string: "I don't judge people by their decision to wear a hat"
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



q4 = Question.create!(
  content: "Tabs or spaces?",
  multi_select: false
)

  QuestionChoice.create!(
    question_id: q4.id,
    choice_string: "Tabs"
  )

  QuestionChoice.create!(
    question_id: q4.id,
    choice_string: "Spaces"
  )

  QuestionChoice.create!(
    question_id: q4.id,
    choice_string: "I dunno lol"
  )



q5 = Question.create!(
  content: "What's your ideal date?",
  multi_select: true
)

  QuestionChoice.create!(
    question_id: q5.id,
    choice_string: "A walk in the park"
  )

  QuestionChoice.create!(
    question_id: q5.id,
    choice_string: "Cigarette under the bridge"
  )

  QuestionChoice.create!(
    question_id: q5.id,
    choice_string: "A dinner in paris"
  )

  QuestionChoice.create!(
    question_id: q5.id,
    choice_string: "Cage match to the death"
  )

  QuestionChoice.create!(
    question_id: q5.id,
    choice_string: "Good luck trying to get me to leave the house, sucker!"
  )



q6 = Question.create!(
  content: "Horror movies, yes or no?",
  multi_select: false
)

  QuestionChoice.create!(
    question_id: q6.id,
    choice_string: "YES"
  )

  QuestionChoice.create!(
    question_id: q6.id,
    choice_string: "But I'm ascare :("
  )

  QuestionChoice.create!(
    question_id: q6.id,
    choice_string: "The bad question is coming...from INSIDE THE APP"
  )

  QuestionChoice.create!(
    question_id: q6.id,
    choice_string: "I'm thoroughly indifferent"
  )
