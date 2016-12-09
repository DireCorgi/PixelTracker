import {
  RECEIVE_PROJECTS,
  RECEIVE_ONE_PROJECT,
  RECEIVE_PROJECT_ERRORS,
  LOADING_PROJECTS,
  LOADING_PROJECT_MEMBERS,
} from '../actions/project_actions';

const defaultState = {
  membersLoading: false,
  projectsLoading: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case RECEIVE_PROJECTS:
    case RECEIVE_ONE_PROJECT:
    case RECEIVE_PROJECT_ERRORS:
      return defaultState;
    case LOADING_PROJECTS:
      return Object.assign({}, state, { projectsLoading: true });
    case LOADING_PROJECT_MEMBERS:
      return Object.assign({}, state, { membersLoading: true });
    default:
      return state;
  }
};
