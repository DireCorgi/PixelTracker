class ChangeOrdNameInPixelTable < ActiveRecord::Migration[5.0]
  def change
    rename_column :pixels, :story_ord, :pixel_ord
  end
end
