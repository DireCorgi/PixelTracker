import { RECEIVE_PROJECTS, RECEIVE_ONE_PROJECT, RECEIVE_PROJECT_ERRORS }
  from '../actions/project_actions';

const defaultState = { errors: [], projectList: {} };

const ProjectReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_PROJECTS:
      newState.projectList = action.projects;
      newState.errors = [];
      return newState;
    case RECEIVE_ONE_PROJECT:
      const addedProjectList = Object.assign({}, state.projectList);
      addedProjectList[action.project.id] = action.project;
      newState.projectList = addedProjectList;
      newState.errors = [];
      return newState;
    case RECEIVE_PROJECT_ERRORS:
      newState.errors = action.errors;
      return newState;
    default:
      return state;
  }
};

export default ProjectReducer;
