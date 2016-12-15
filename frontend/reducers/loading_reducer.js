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
  DELETE_PIXEL,
  LOADING_TASKS,
  LOADING_COMMENTS,
  LOAD_SINGLE_PIXEL,
  LOADING_COMPLETE_SINGLE_PIXEL,
} from '../actions/pixel_actions';

const defaultState = {
  membersLoading: false,
  projectsLoading: false,
  pixelsLoading: false,
  tasksLoading: false,
  commentsLoading: false,
  individualPixelsLoading: {},
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_PROJECTS:
    case RECEIVE_ALL_PIXELS:
    case RECEIVE_ONE_PROJECT:
    case RECEIVE_PROJECT_ERRORS:
      return defaultState;
    case RECEIVE_PIXEL_ERRORS:
    case RECEIVE_PIXEL_DETAIL:
    case DELETE_PIXEL:
      const clearState = Object.assign({}, defaultState);
      clearState.individualPixelsLoading = state.individualPixelsLoading;
      return clearState;
    case LOAD_SINGLE_PIXEL:
      const newState = (Object.assign({}, state));
      const pixelsLoading = Object.assign({}, state.individualPixelsLoading);
      pixelsLoading[action.pixelId] = true;
      newState.individualPixelsLoading = pixelsLoading;
      return newState;
    case LOADING_COMPLETE_SINGLE_PIXEL:
      const updatedState = (Object.assign({}, state));
      const updatedPixelsLoading = Object.assign({}, state.individualPixelsLoading);
      updatedPixelsLoading[action.pixelId] = false;
      updatedState.individualPixelsLoading = updatedPixelsLoading;
      return updatedState;
    case LOADING_PROJECTS:
      return Object.assign({}, state, { projectsLoading: true });
    case LOADING_PROJECT_MEMBERS:
      return Object.assign({}, state, { membersLoading: true });
    case LOADING_PIXELS:
      return Object.assign({}, state, { pixelsLoading: true });
    case LOADING_TASKS:
      return Object.assign({}, state, { tasksLoading: true });
    case LOADING_COMMENTS:
      return Object.assign({}, state, { commentsLoading: true });
    default:
      return state;
  }
};
