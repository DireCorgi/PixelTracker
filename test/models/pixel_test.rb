# == Schema Information
#
# Table name: pixels
#
#  id           :integer          not null, primary key
#  story_ord    :integer          not null
#  state        :string           not null
#  title        :string           not null
#  category     :string           not null
#  description  :text
#  points       :integer          not null
#  project_id   :integer          not null
#  requester_id :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'test_helper'

class PixelTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
