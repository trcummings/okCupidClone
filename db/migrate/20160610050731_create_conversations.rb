class CreateConversations < ActiveRecord::Migration
  def change
    create_table :conversations do |t|
      t.integer :sender_id, null: false
      t.integer :receiver_id, null: false
      t.string :conversation_name, null: false

      t.timestamps null: false
    end

    add_index :conversations, :sender_id
  end
end
