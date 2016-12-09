class CreatePixels < ActiveRecord::Migration[5.0]
  def change
    create_table :pixels do |t|
      t.integer :story_ord, null: false
      t.string :state, null: false, index: true
      t.string :title, null: false
      t.string :category, null: false, index: true
      t.text :description
      t.integer :points, null: false
      t.integer :project_id, null: false, index: true
      t.integer :requester_id, null: false, index: true

      t.timestamps
    end
  end
end
