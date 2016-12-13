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

require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
