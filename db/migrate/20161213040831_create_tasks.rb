class CreateTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :tasks do |t|
      t.text :body, null: false
      t.boolean :complete, null: false, default: false
      t.integer :pixel_id, null: false, index: true
      t.integer :task_ord, null: false

      t.timestamps
    end
  end
end
