import { RECEIVE_ALL_PIXELS, RECEIVE_PIXEL_DETAIL, RECEIVE_PIXEL_ERRORS, DELETE_PIXEL, RESET_PIXELS, RECEIVE_TASKS }
  from '../actions/pixel_actions';

const defaultState = { pixelList: {}, errors: {}, tasks: [] };

export default (state = defaultState, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_ALL_PIXELS:
      const newPixelList = {};
      action.pixels.forEach((pixel) => {
        newPixelList[pixel.id] = pixel;
      });
      newState.errors = {};
      newState.pixelList = newPixelList;
      return newState;
    case RECEIVE_PIXEL_DETAIL:
      const curPixelList = Object.assign({}, newState.pixelList);

      curPixelList[action.pixel.id] = action.pixel;
      newState.pixelList = curPixelList;
      newState.errors = {};
      return newState;
    case RECEIVE_PIXEL_ERRORS:
      newState.errors = action.errors;
      return newState;
    case RESET_PIXELS:
      return defaultState;
    case DELETE_PIXEL:
      const deletedPixelList = Object.assign({}, newState.pixelList);
      delete deletedPixelList[action.pixelId];
      newState.pixelList = deletedPixelList;
      return newState;
    case RECEIVE_TASKS:
      newState.tasks = action.tasks;
      return newState;
    default:
      return state;
  }
};
