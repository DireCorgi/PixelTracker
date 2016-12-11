json.array! @pixels do |pixel|
  json.partial! "api/pixels/pixel", pixel: pixel
end
