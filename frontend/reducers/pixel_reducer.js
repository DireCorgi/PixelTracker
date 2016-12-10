import { RECEIVE_ALL_PIXELS, RECEIVE_PIXEL_DETAIL, RECEIVE_PIXEL_ERRORS }
  from '../actions/pixel_actions';

const defaultState = { pixelList: {}, pixelDetails: {}, errors: {} };

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
      const updatedPixelList = Object.assign({}, newState.pixelList);
      const newPixelDetails = Object.assgin({}, newState.pixelDetails);

      const newPixel = {};
      newPixel.id = action.pixel.id;
      newPixel.title = action.pixel.title;
      newPixel.category = action.pixel.category;
      newPixel.state = action.pixel.state;
      newPixel.points = action.pixel.points;
      newPixel.pixel_ord = action.pixel.pixel_ord;

      updatedPixelList[newPixel.id] = newPixel;
      newPixelDetails[action.pixel.id] = action.pixel;
      newState.pixelList = updatedPixelList;
      newState.pixelDetails = newPixelDetails;
      newState.errors = {};
      return newState;
    case RECEIVE_PIXEL_ERRORS:
      newState.errors = action.errors;
      return newState;
    default:
      return state;
  }
};
