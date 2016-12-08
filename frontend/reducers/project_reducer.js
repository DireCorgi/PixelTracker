import { RECEIVE_PROJECTS, RECEIVE_ONE_PROJECT, RECEIVE_PROJECT_ERRORS }
  from '../actions/project_actions';

const defaultState = { errors: [], projectDetail: {} };

const ProjectReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_PROJECTS:
      newState = Object.assign(newState, action.projects);
      return newState;
    case RECEIVE_ONE_PROJECT:
      newState.projectDetail = action.project;
      return newState;
    case RECEIVE_PROJECT_ERRORS:
      newState.errors = action.errors;
      return newState;
    default:
      return state;
  }
};

export default ProjectReducer;
