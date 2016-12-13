import * as PixelsAPIUtil from '../util/pixels_api_util.js';
import * as CommentsAPIUtil from '../util/comments_api_util.js';
import * as TasksAPIUtil from '../util/tasks_api_util.js';

export const RECEIVE_ALL_PIXELS = 'RECEIVE_ALL_PIXELS';
export const RECEIVE_PIXEL_DETAIL = 'RECEIVE_PIXEL_DETAIL';
export const RECEIVE_PIXEL_ERRORS = 'RECEIVE_PIXEL_ERRORS';
export const DELETE_PIXEL = 'DELETE_PIXEL';
export const LOADING_PIXELS = 'LOADING_PIXELS';
export const RESET_PIXELS = 'RESET_PIXELS';
export const LOADING_TASKS = 'LOADING_TASKS';
export const LOADING_COMMENTS = 'LOADING_COMMENTS';

export const receivePixels = (pixels) => {
  return {
    type: RECEIVE_ALL_PIXELS,
    pixels,
  };
};

export const resetPixels = () => {
  return {
    type: RESET_PIXELS,
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

export const resetPixelErrors = () => {
  return {
    type: RECEIVE_PIXEL_ERRORS,
    errors: {},
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

export const loadingTasks = () => {
  return { type: LOADING_TASKS };
};

export const loadingComments = () => {
  return { type: LOADING_COMMENTS };
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

export const createComment = (comment) => {
  return (dispatch) => {
    dispatch(loadingComments());
    return CommentsAPIUtil.createComment(comment).then(
      pixel => dispatch(receivePixelDetail(pixel)),
      errors => dispatch(receivePixelErrors(errors.responseJSON))
    );
  };
};

export const updateComment = (comment) => {
  return (dispatch) => {
    dispatch(loadingComments());
    return CommentsAPIUtil.updateComment(comment).then(
      pixel => dispatch(receivePixelDetail(pixel)),
      errors => dispatch(receivePixelErrors(errors.responseJSON))
    );
  };
};

export const deleteComment = (commentId) => {
  return (dispatch) => {
    dispatch(loadingComments());
    return CommentsAPIUtil.deleteComment(commentId).then(
      pixel => dispatch(receivePixelDetail(pixel)),
      errors => dispatch(receivePixelErrors(errors.responseJSON))
    );
  };
};

export const createTask = (task) => {
  return (dispatch) => {
    dispatch(loadingTasks());
    return TasksAPIUtil.createTask(task).then(
      pixel => dispatch(receivePixelDetail(pixel)),
      errors => dispatch(receivePixelErrors(errors.responseJSON))
    );
  };
};

export const updateTask = (task) => {
  return (dispatch) => {
    dispatch(loadingTasks());
    return TasksAPIUtil.updateTask(task).then(
      pixel => dispatch(receivePixelDetail(pixel)),
      errors => dispatch(receivePixelErrors(errors.responseJSON))
    );
  };
};

export const deleteTask = (taskId) => {
  return (dispatch) => {
    dispatch(loadingTasks());
    return TasksAPIUtil.deleteTask(taskId).then(
      pixel => dispatch(receivePixelDetail(pixel)),
      errors => dispatch(receivePixelErrors(errors.responseJSON))
    );
  };
};
