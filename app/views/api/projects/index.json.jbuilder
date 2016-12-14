@projects.each do |project|
  json.set! project.id do
    json.id project.id
    json.name project.name
    json.privacy project.private
    json.updated_at project.updated_at.strftime("%m-%d-%Y %H:%M:%S")
    json.members do
      json.array! project.project_members do |project_member|
        json.project_member_id project_member.id
        json.member_name project_member.user.username
        json.member_email project_member.user.email
      end
    end
  end
end
