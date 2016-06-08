require 'csv'

CSV.foreach("./question_database.csv") do |row, index|
  next if index == 0
  row.split(',')
  p row
end
