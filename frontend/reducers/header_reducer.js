import { RECEIVE_NEW_HEADER_TYPE } from '../actions/header_actions';

const defaultState = { headerType: "default" };

const HeaderReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_NEW_HEADER_TYPE:
      const newState = Object.assign({}, state);
      newState.headerType = action.headerType;
      return newState;
    default:
      return state;
  }
};

export default HeaderReducer;
