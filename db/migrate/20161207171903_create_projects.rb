class CreateProjects < ActiveRecord::Migration[5.0]
  def change
    create_table :projects do |t|
      t.string :name, null: false
      t.boolean :private, null: false

      t.timestamps
    end
  end
end
