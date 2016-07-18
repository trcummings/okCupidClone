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



margaret_hamilton = User.create!(
  username: 'UnApollogetic11',
  password: 'moonlandingwasfaked',
  email: 'hamilton@nasa.gov',
  birth_date: Date.new(1902, 09, 12),
  country: 'America',
  zip_code: 06068,
  location: 'Salisbury, CT',
  gender: 'Woman',
  orientation: 'Straight'
)

UserAbout.create!(
  user_id: margaret_hamilton.id,
  self_summary: 'Please, no messages about the moon landing.',
  doing_with_life: 'Practicing squats to lift these code books.',
  really_good_at: 'Getting people to land on the moon.',
  thinking_about: "I really hope I didn't lose a bookmark, have you seen the size of the code books I wrote?",
  typical_friday: 'Thinking about fault tolerance. I coined the term "Software Engineer", you know.',
  message_me_if: 'You can lift these code books!'
)




richard_stallman = User.create!(
  username: 'install_gentoo',
  password: 'password',
  email: 'rms@mit.edu',
  birth_date: Date.new(1953, 16, 03),
  country: 'America',
  zip_code: 10001,
  location: 'Manhattan, NY',
  gender: 'Man',
  orientation: 'Sapiosexual'
)

UserAbout.create!(
  user_id: richard_stallman.id,
  self_summary: "Normally I wouldn't use proprietary software like this",
  doing_with_life: "GNU stands for GNU's not Unix",
  really_good_at: 'Acing Math 55',
  thinking_about: 'Free Software',
  typical_friday: "Telling people not to call it Linux, alright? I'm calling you out, Torvalds",
  message_me_if: 'You will not mention that time I ate a piece of my foot during a live MIT lecture'
)




anna_patterson = User.create!(
  username: 'CuillinIt',
  password: 'secretgoogle',
  email: 'anna@google.com',
  birth_date: Date.new(1978, 04, 10),
  country: 'America',
  zip_code: 94027,
  location: 'San Fransisco, CA',
  gender: 'Woman',
  orientation: 'Straight'
)

UserAbout.create!(
  user_id: anna_patterson.id,
  self_summary: 'I live in a garage',
  doing_with_life: 'Living in a garage',
  really_good_at: 'Living in a garage',
  thinking_about: 'Not living in a garage.',
  typical_friday: "I don't really live in a garage",
  message_me_if: 'You use Bing. JUST KIDDING.'
)




brendan_eich = User.create!(
  username: 'Eichconoclast',
  password: 'chromesux',
  email: 'brendan@mozilla.com',
  birth_date: Date.new(1961, 8, 24),
  country: 'America',
  zip_code: 15201,
  location: 'Pittsburgh, PA',
  gender: 'Man',
  orientation: 'Straight'
)

UserAbout.create!(
  user_id: brendan_eich.id,
  self_summary: "",
  doing_with_life: '',
  really_good_at: 'Making new languages in a week;',
  thinking_about: 'Segfaults;',
  typical_friday: '',
  message_me_if: "You're a rustacean, or you still use firefox;"
)





mats = User.create!(
  username: 'matz',
  password: 'rubyonrails',
  email: 'matz@rubylanguage.org',
  birth_date: Date.new(1965, 04, 14),
  country: 'Japan',
  zip_code: 10001,
  location: 'Osaka Prefecture, Japan',
  gender: 'Man',
  orientation: 'Straight'
)

UserAbout.create!(
  user_id: mats.id,
  self_summary: 'i do not speak english very good',
  doing_with_life: '',
  really_good_at: '',
  six_things: '',
  thinking_about: '',
  typical_friday: '',
  message_me_if: ''
)




peter_theil = User.create!(
  username: 'TheilfInTheNight',
  password: 'cryptonomicon',
  email: 'theil@paypal.com',
  birth_date: Date.new(1967, 11, 10),
  country: 'America',
  zip_code: 94027,
  location: 'San Fransisco, CA',
  gender: 'Man',
  orientation: 'Gay'
)

UserAbout.create!(
  user_id: peter_theil.id,
  self_summary: 'Gettin paid, pal',
  doing_with_life: 'Seriously too rich',
  really_good_at: 'Swimming in piles of my own money. The coins, uh, they hurt. It is not very comfortable.',
  thinking_about: 'I could buy you',
  typical_friday: 'I just hate...I hate college so much.',
  message_me_if: 'You also plan on living 120 years'
)


#### GUEST ACCOUNT

guestyMcGuestface = User.create!(
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


q7 = Question.create!(
  content: "Situaton: You're a VC, you want to fund the next big thing. What is it? (asking for a friend)",
  multi_select: false
)

  QuestionChoice.create!(
    question_id: q7.id,
    choice_string: 'Biotech'
  )

  QuestionChoice.create!(
    question_id: q7.id,
    choice_string: 'Safe General AI'
  )

  QuestionChoice.create!(
    question_id: q7.id,
    choice_string: 'Drones'
  )

  QuestionChoice.create!(
    question_id: q7.id,
    choice_string: 'The Cloud'
  )

  QuestionChoice.create!(
    question_id: q7.id,
    choice_string: 'The sight of money makes me irrationally angry, so whatever the Effective Altruists are workin on these days.'
  )




q8 = Question.create!(
  content: "Favorite algorithm?",
  multi_select: false
)

  QuestionChoice.create!(
    question_id: q8.id,
    choice_string: 'Merge Sort'
  )

  QuestionChoice.create!(
    question_id: q8.id,
    choice_string: 'Quick Sort'
  )

  QuestionChoice.create!(
    question_id: q8.id,
    choice_string: 'Radix Sort'
  )

  QuestionChoice.create!(
    question_id: q8.id,
    choice_string: 'Bubble Sort'
  )

  QuestionChoice.create!(
    question_id: q8.id,
    choice_string: 'Other (list below)'
  )

  QuestionChoice.create!(
    question_id: q8.id,
    choice_string: "Could we get some algorithms that...aren't sorting algorithms in here?"
  )
