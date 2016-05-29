# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
email           | string    | not null, indexed, unique
birth_date      | integer   | not null, indexed, unique
country         | string    | not null, indexed, unique
zip_code        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
last_online     | datetime  | not null, indexed, unique (possibly redundant w/timestamps)

## user_questions
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key, indexed,
question_id     | integer   | not null, foreign key, indexed, unique [user_id]
answer          | integer   | not null
acceptable      | integer   | not null
importance      | integer   | not null, is either: (0, 1, 10, 250)
explanation     | text      |
private         | boolean   | not null, indexed, unique

## questions
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
description     | string    | not null
answer_choices  | string    | not null
multi_select    | boolean   | not null, default: false

## profile_abouts
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key, unique
self_summary    | text      |
doing_with_life | text      |
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
dating_type     | text      | not null, limited to: [short term, long term, new friends, casual sex]

## profile_about_details
column name       | data type | details
------------------|-----------|-----------------------
id                | integer   | not null, primary key
user_id           | integer   | not null, foreign key, unique
orientation       | string    |
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

## matches
column name       | data type | details
------------------|-----------|-----------------------
id                | integer   | not null, primary key
user_id           | integer   | not null, foreign key, unique [other_user_id]
other_user_id     | string    | not null, foreign key, unique [user_id]

## user_photos
column name       | data type | details
------------------|-----------|-----------------------
id                | integer   | not null, primary key
user_id           | integer   | not null, foreign key
photo_url         | string    | not null, foreign key
