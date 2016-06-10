class ChangeMessageToHaveConversationId < ActiveRecord::Migration
  def change
    add_column :messages, :conversation_id, :integer
    change_column_null :messages, :conversation_id, :integer
    add_index :messages, :conversation_id
  end
end
