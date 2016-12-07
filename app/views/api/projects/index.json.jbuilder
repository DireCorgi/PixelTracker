json.array! @projects do |project|
  json.id project.id
  json.name project.name
  json.updated_at project.updated_at
end
