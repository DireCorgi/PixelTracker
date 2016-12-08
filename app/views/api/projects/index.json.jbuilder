json.array! @projects do |project|
  json.id project.id
  json.name project.name
  json.privacy project.private
  json.updated_at project.updated_at.strftime("%m-%d-%Y %H:%M:%S")
end
