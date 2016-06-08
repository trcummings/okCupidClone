# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160607232414) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answers", force: :cascade do |t|
    t.integer  "user_id",        null: false
    t.integer  "question_id",    null: false
    t.string   "chosen_ids",     null: false, array: true
    t.string   "acceptable_ids", null: false, array: true
    t.integer  "importance",     null: false
    t.text     "explanation"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "answers", ["question_id"], name: "index_answers_on_question_id", using: :btree
  add_index "answers", ["user_id"], name: "index_answers_on_user_id", using: :btree

  create_table "likes", force: :cascade do |t|
    t.integer  "liker_id",   null: false
    t.integer  "likee_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "likes", ["likee_id"], name: "index_likes_on_likee_id", using: :btree
  add_index "likes", ["liker_id"], name: "index_likes_on_liker_id", using: :btree

  create_table "messages", force: :cascade do |t|
    t.integer  "sender_id",   null: false
    t.integer  "receiver_id", null: false
    t.text     "content",     null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "messages", ["receiver_id"], name: "index_messages_on_receiver_id", using: :btree
  add_index "messages", ["sender_id"], name: "index_messages_on_sender_id", using: :btree

  create_table "question_choices", force: :cascade do |t|
    t.integer  "question_id",   null: false
    t.string   "choice_string", null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "question_choices", ["question_id"], name: "index_question_choices_on_question_id", using: :btree

  create_table "questions", force: :cascade do |t|
    t.string   "content",                      null: false
    t.boolean  "multi_select", default: false, null: false
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
  end

  create_table "user_abouts", force: :cascade do |t|
    t.integer  "user_id",         null: false
    t.text     "self_summary"
    t.text     "doing_with_life"
    t.text     "really_good_at"
    t.text     "favorite_things"
    t.text     "six_things"
    t.text     "thinking_about"
    t.text     "typical_friday"
    t.text     "message_me_if"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "user_abouts", ["user_id"], name: "index_user_abouts_on_user_id", using: :btree

  create_table "user_photos", force: :cascade do |t|
    t.integer  "user_id",                    null: false
    t.string   "photo_url",                  null: false
    t.string   "description"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.boolean  "is_default",  default: true
    t.string   "public_id",                  null: false
  end

  add_index "user_photos", ["user_id"], name: "index_user_photos_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string  "username",        null: false
    t.string  "email",           null: false
    t.date    "birth_date",      null: false
    t.string  "country",         null: false
    t.integer "zip_code",        null: false
    t.string  "password_digest", null: false
    t.string  "session_token",   null: false
    t.string  "location",        null: false
    t.string  "gender",          null: false
    t.string  "orientation",     null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["username"], name: "index_users_on_username", using: :btree

end
