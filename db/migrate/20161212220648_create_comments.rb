class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.text :body, null: false
      t.integer :pixel_id, null: false, index: true
      t.integer :user_id ,null: false, index: true
      t.timestamps
    end
  end
end
