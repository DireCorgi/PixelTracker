import { RECEIVE_NEW_HEADER_TYPE } from '../actions/header_actions';

const defaultState = { headerType: "default", tooltip: false };

const HeaderReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_NEW_HEADER_TYPE:
      const newState = Object.assign({}, state);
      newState.headerType = action.headerType;
      if (action.tooltip) newState.tooltip = true;
      return newState;
    default:
      return state;
  }
};

export default HeaderReducer;
