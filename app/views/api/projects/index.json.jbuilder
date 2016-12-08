json.array! @projects do |project|
  json.partial! "api/projects/projects", project: project
end
