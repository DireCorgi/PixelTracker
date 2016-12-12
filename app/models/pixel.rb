# == Schema Information
#
# Table name: pixels
#
#  id           :integer          not null, primary key
#  pixel_ord    :integer          not null
#  state        :string           not null
#  title        :string           not null
#  category     :string           not null
#  description  :text
#  points       :integer          not null
#  project_id   :integer          not null
#  requester_id :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  icebox       :boolean          default(TRUE), not null
#

class Pixel < ApplicationRecord
  valid_states = %w(Unstarted Started Finished Delivered Rejected Accepted)
  valid_categories = %w(Feature Bug Chore Release)

  validates :pixel_ord,
    :state,
    :title,
    :category,
    :points,
    :project,
    :requester,
    presence: true

  validates :state, inclusion: { in: valid_states, message: "is an invalid state" }
  validates :category, inclusion: {in: valid_categories, message: "is an invalid category"}
  validates :icebox, inclusion: { in: [ true, false ] }

  belongs_to :project

  belongs_to :requester,
    class_name: :User,
    foreign_key: :requester_id

  has_many :comments

  has_many :commenters,
    through: :comments,
    source: :user

end
