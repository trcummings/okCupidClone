# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
email           | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## user_questions
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id         | integer   | not null, foreign key, indexed,
question_id     | integer   | not null, foreign key, indexed, unique [user_id]
answer          | integer   | not null
acceptable      | integer   | not null
importance      | integer   | not null
explanation     | text      |
private         | boolean   | not null, indexed, unique

## questions
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
description     | string    | not null, primary key
answer_choices  | string    | not null, primary key

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
