# == Schema Information
#
# Table name: project_members
#
#  id         :integer          not null, primary key
#  project_id :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ProjectMember < ApplicationRecord
  validates :project, :user, presence: :true
  validates :user_id, uniqueness: { scope: :project_id }

  belongs_to :user
  belongs_to :project
end
