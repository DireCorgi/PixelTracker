json.array! @pixels do |pixel|
  json.id pixel.id
  json.title pixel.title
  json.category pixel.category
  json.state pixel.state
  json.points pixel.points
  json.pixel_ord pixel.pixel_ord
end
