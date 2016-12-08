import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS }
  from '../actions/session_actions';

const defaultState = { currentUser: null, errors: [] };

const SessionReducer = (state = defaultState, action) => {
  Object.freeze(state);
  const newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState.currentUser = action.currentUser;
      newState.errors = [];
      return newState;
    case RECEIVE_ERRORS:
      newState.errors = action.errors;
      return newState;
    default:
      return state;
  }
};

export default SessionReducer;
