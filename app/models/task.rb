# == Schema Information
#
# Table name: tasks
#
#  id         :integer          not null, primary key
#  body       :text             not null
#  complete   :boolean          default(FALSE), not null
#  pixel_id   :integer          not null
#  task_ord   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Task < ApplicationRecord
  validates :body, :pixel, :task_ord, presence: true
  validates :complete, inclusion: { in: [ true, false ], message: "is not defined" }

  belongs_to :pixel,
    inverse_of: :tasks

  default_scope { order(:task_ord) }

end
