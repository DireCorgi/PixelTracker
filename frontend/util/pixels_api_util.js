export const fetchAllPixels = (projectId) => {
  return $.ajax({
    url: `api/projects/${projectId}/pixels`,
    method: 'GET',
  });
};

export const fetchPixelDetail = (pixelId) => {
  return $.ajax({
    url: `api/pixels/${pixelId}`,
    method: 'GET',
  });
};

export const createPixel = (projectId, pixel) => {
  return $.ajax({
    url: `api/projects/${projectId}/pixels`,
    method: 'POST',
    data: { pixel },
  });
};

export const updatePixel = (pixelId, pixel) => {
  return $.ajax({
    url: `api/pixels/${pixelId}`,
    method: 'PATCH',
    data: { pixel }
  });
};

export const deletePixel = (pixelId) => {
  return $.ajax({
    url: `api/pixels/${pixelId}`,
    method: 'DELETE',
  });
};
