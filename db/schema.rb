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

ActiveRecord::Schema.define(version: 20161213040831) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.text     "body",       null: false
    t.integer  "pixel_id",   null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["pixel_id"], name: "index_comments_on_pixel_id", using: :btree
    t.index ["user_id"], name: "index_comments_on_user_id", using: :btree
  end

  create_table "pixels", force: :cascade do |t|
    t.integer  "pixel_ord",                   null: false
    t.string   "state",                       null: false
    t.string   "title",                       null: false
    t.string   "category",                    null: false
    t.text     "description"
    t.integer  "points",                      null: false
    t.integer  "project_id",                  null: false
    t.integer  "requester_id",                null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.boolean  "icebox",       default: true, null: false
    t.index ["category"], name: "index_pixels_on_category", using: :btree
    t.index ["project_id"], name: "index_pixels_on_project_id", using: :btree
    t.index ["requester_id"], name: "index_pixels_on_requester_id", using: :btree
    t.index ["state"], name: "index_pixels_on_state", using: :btree
  end

  create_table "project_members", force: :cascade do |t|
    t.integer  "project_id", null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_project_members_on_project_id", using: :btree
    t.index ["user_id", "project_id"], name: "index_project_members_on_user_id_and_project_id", unique: true, using: :btree
    t.index ["user_id"], name: "index_project_members_on_user_id", using: :btree
  end

  create_table "projects", force: :cascade do |t|
    t.string   "name",       null: false
    t.boolean  "private",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tasks", force: :cascade do |t|
    t.text     "body",                       null: false
    t.boolean  "complete",   default: false, null: false
    t.integer  "pixel_id",                   null: false
    t.integer  "task_ord",                   null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.index ["pixel_id"], name: "index_tasks_on_pixel_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "email"
    t.index ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
    t.index ["username"], name: "index_users_on_username", unique: true, using: :btree
  end

end
