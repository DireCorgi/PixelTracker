import { DRAG_ERROR, CLEAR_ERRORS } from '../actions/error_actions';

const defaultState = { dragErrors: false };

const ErrorReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case DRAG_ERROR:
      return { dragErrors: true };
    case CLEAR_ERRORS:
      return defaultState;
    default:
      return state;
  }
};

export default ErrorReducer;
