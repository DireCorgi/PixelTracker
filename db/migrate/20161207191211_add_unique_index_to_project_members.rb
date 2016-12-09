class AddUniqueIndexToProjectMembers < ActiveRecord::Migration[5.0]
  def change
    add_index :project_members, [:user_id, :project_id], unique: true
  end
end
