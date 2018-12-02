class CreateThumpSessions < ActiveRecord::Migration[5.1]
  def change
    create_table :thump_sessions do |t|
    	t.datetime :start_time
    	t.float :duration_minutes
    	t.float :pumps_per_minute
    	t.integer :rating
    	t.string :nickname
    	t.text :notes

      t.timestamps
    end

    add_column :thump_sessions, :user_id, :integer
    add_foreign_key :thump_sessions, :users
    add_index :thump_sessions, :user_id, unique: true
  end
end
