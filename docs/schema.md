# Schema Information

## users
column name       | data type | details
------------------|-----------|-----------------------
id                | integer   | not null, primary key
username          | string    | not null, indexed, unique
email             | string    | not null, indexed, unique
birth_date        | datetime  | not null
country           | string    | not null
zip_code          | string    | not null
password_digest   | string    | not null
session_token     | string    | not null
gender            | string    | not null /// DETAILS START HERE
orientation       | string    | not null
ethnicity         | string    |
status            | string    |
relationship_type | string    |
height            | string    |
body_type         | string    |
diet              | string    |
smoking           | string    |
drinking          | string    |
drugs             | string    |
sign              | string    |
education         | string    |
offspring         | string    |
pets              | string    |
speaks            | string    |

## profile_abouts
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key, unique
self_summary    | text      |
doing_with_life | text      |
really_good_at  | text      |
favorite_things | text      |
six_things      | text      |
thinking_about  | text      |
typical_friday  | text      |
message_me_if   | text      |

## profile_looking_fors
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key, unique
gender          | text      | not null
age_range       | text      | not null, between 18 and 99
distance        | text      | not null, minimum 5mi
status          | text      | not null
dating_type     | text      | not null, limited to: [short term, long term, new friends, casual sex, smelly hog crew, three children in a trench coat trying to buy a ticket to an r rated movie]

## user_photos
column name       | data type | details
------------------|-----------|-----------------------
id                | integer   | not null, primary key
user_id           | integer   | not null, foreign key, indexed
photo_url         | string    | not null, foreign key, indexed
description       | string    |
is_default        | boolean   | default: true, indexed

## visits_table
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
visitor_id      | string    | not null, foreign_key, indexed, unique
visitee_id      | string    | not null, foreign_key, indexed, unique
visitee_saw     | boolean   | not null, default: false  

## answers
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key, indexed,
question_id     | integer   | not null, foreign key, indexed, unique [user_id]
answer          | integer   | not null
acceptable      | integer   | not null
importance      | integer   | not null, is either: (0, 1, 10, 250)
explanation     | text      |
private         | boolean   | not null, default: false

## questions
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
description     | string    | not null
multi_select    | boolean   | not null, default: false

## question_choices
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
question_id     | integer   | not null, 
description     | string    | not null
multi_select    | boolean   | not null, default: false

## likes
column name       | data type | details
------------------|-----------|-----------------------
id                | integer   | not null, primary key
liker_id          | integer   | not null, foreign key, unique [other_user_id]
likee_id          | string    | not null, foreign key, unique [user_id]
likee_saw         | boolean   | not null, default: false

## Messages
column name       | data type | details
------------------|-----------|------------------------
id                | integer   | not null, primary key
sender_id         | integer   | not null, foreign key, indexed
reciever_id       | integer   | not null, foreign key, indexed
chatlog_file_url  | string    | not null, indexed

## Conversation
column name       | data type | details
------------------|-----------|------------------------
id                | integer   | not null, primary key
channel_name      | string    | not null, indexed
