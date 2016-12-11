class AddIceboxBooleanToPixels < ActiveRecord::Migration[5.0]
  def change
    add_column :pixels, :icebox, :boolean, null: false, default: true
  end
end
