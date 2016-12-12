import {
  SHOW_COLUMN,
  HIDE_COLUMN,
  RESET_VIEW,
} from '../actions/sidebar_actions';

const defaultState = { icebox: true, done: true, current: true, newPixel: false };

const SidebarReducer = (state = defaultState, action) => {
  Object.freeze(state);
  const newState = Object.assign({}, state);
  switch (action.type) {
    case SHOW_COLUMN:
      newState[action.columnName] = true;
      return newState;
    case HIDE_COLUMN:
      newState[action.columnName] = false;
      return newState;
    case RESET_VIEW:
      return defaultState;
    default:
      return state;
  }
};

export default SidebarReducer;
