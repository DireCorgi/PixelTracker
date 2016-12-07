# == Schema Information
#
# Table name: projects
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  private    :boolean          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Project < ApplicationRecord
  validates :name, presence: true
  validates :private, inclusion: { in: [ true, false ], message: "Private not defined" }

  has_many :project_members

  has_many :members,
    through: :project_members,
    source: :user
end
