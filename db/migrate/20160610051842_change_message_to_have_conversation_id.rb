class ChangeMessageToHaveConversationId < ActiveRecord::Migration[4.2]
  def change
    add_column :messages, :conversation_id, :integer
    change_column_null :messages, :conversation_id, :integer
    add_index :messages, :conversation_id
  end
end
