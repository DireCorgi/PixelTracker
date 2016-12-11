import * as PixelsAPIUtil from '../util/pixels_api_util.js';

export const RECEIVE_ALL_PIXELS = 'RECEIVE_ALL_PIXELS';
export const RECEIVE_PIXEL_DETAIL = 'RECEIVE_PIXEL_DETAIL';
export const RECEIVE_PIXEL_ERRORS = 'RECEIVE_PIXEL_ERRORS';
export const DELETE_PIXEL = 'DELETE_PIXEL';
export const LOADING_PIXELS = 'LOADING_PIXELS';

export const receivePixels = (pixels) => {
  return {
    type: RECEIVE_ALL_PIXELS,
    pixels,
  };
};

export const receivePixelDetail = (pixel) => {
  return {
    type: RECEIVE_PIXEL_DETAIL,
    pixel,
  };
};

export const deletePixel = (pixelId) => {
  return {
    type: DELETE_PIXEL,
    pixelId
  };
};

export const receivePixelErrors = (errors) => {
  return {
    type: RECEIVE_PIXEL_ERRORS,
    errors: errors,
  };
};

export const loadingPixels = () => {
  return { type: LOADING_PIXELS };
};

export const fetchPixels = (projectId) => {
  return (dispatch) => {
    dispatch(loadingPixels());
    return PixelsAPIUtil.fetchAllPixels(projectId).then(
      pixels => dispatch(receivePixels(pixels)),
      errors => dispatch(receivePixelErrors(errors.responseJSON))
    );
  };
};

export const fetchPixelDetail = (pixelId) => {
  return (dispatch) => {
    dispatch(loadingPixels());
    return PixelsAPIUtil.fetchPixelDetail(pixelId).then(
      pixel => dispatch(receivePixelDetail(pixel)),
      errors => dispatch(receivePixelErrors(errors.responseJSON))
    );
  };
};

export const createPixel = (projectId, pixel) => {
  return (dispatch) => {
    dispatch(loadingPixels());
    return PixelsAPIUtil.createPixel(projectId, pixel).then(
      newPixel => dispatch(receivePixelDetail(newPixel)),
      errors => dispatch(receivePixelErrors(errors.responseJSON))
    );
  };
};

export const updatePixel = (pixelId, pixel) => {
  return (dispatch) => {
    dispatch(loadingPixels());
    return PixelsAPIUtil.updatePixel(pixelId, pixel).then(
      newPixel => dispatch(receivePixelDetail(newPixel)),
      errors => dispatch(receivePixelErrors(errors.responseJSON))
    );
  };
};

export const removePixel = (pixelId) => {
  return (dispatch) => {
    dispatch(loadingPixels());
    return PixelsAPIUtil.deletePixel(pixelId).then(
      data => dispatch(deletePixel(pixelId)),
      errors => dispatch(receivePixelErrors(errors.responseJSON))
    );
  };
};
