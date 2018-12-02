class AddPartnerNameToThumpSession < ActiveRecord::Migration[5.1]
  def change
    add_column :thump_sessions, :partner_name, :string
  end
end
