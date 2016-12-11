json.extract! pixel, :id, :title, :category, :description, :points, :project_id, :pixel_ord, :icebox, :state
json.requester pixel.requester.username
json.updated_at pixel.updated_at.strftime("%m-%d-%Y %H:%M:%S")
