import {
  RECEIVE_PROJECTS,
  RECEIVE_ONE_PROJECT,
  RECEIVE_PROJECT_ERRORS,
  LOADING_PROJECTS,
  LOADING_PROJECT_MEMBERS,
} from '../actions/project_actions';

import {
  RECEIVE_ALL_PIXELS,
  RECEIVE_PIXEL_DETAIL,
  RECEIVE_PIXEL_ERRORS,
  LOADING_PIXELS,
} from '../actions/pixel_actions';

const defaultState = {
  membersLoading: false,
  projectsLoading: false,
  pixelsLoading: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_PROJECTS:
    case RECEIVE_ONE_PROJECT:
    case RECEIVE_PROJECT_ERRORS:
    case RECEIVE_ALL_PIXELS:
    case RECEIVE_PIXEL_DETAIL:
    case RECEIVE_PIXEL_ERRORS:
      return defaultState;
    case LOADING_PROJECTS:
      return Object.assign({}, state, { projectsLoading: true });
    case LOADING_PROJECT_MEMBERS:
      return Object.assign({}, state, { membersLoading: true });
      case LOADING_PIXELS:
      return Object.assign({}, state, { pixelsLoading: true });
    default:
      return state;
  }
};
