import { RECEIVE_PROJECTS, RECEIVE_ONE_PROJECT, RECEIVE_PROJECT_ERRORS }
  from '../actions/project_actions';

const defaultState = { errors: [], projectDetail: {}, projectList: {} };

const ProjectReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_PROJECTS:
      const newProjectList = {};
      action.projects.forEach((project)=> {
        newProjectList[project.id] = project;
      });
      newState.projectList = newProjectList;
      return newState;
    case RECEIVE_ONE_PROJECT:
      const addedProjectList = Object.assign({}, state.projectList);
      addedProjectList[action.project.id] = action.project;
      newState.projectList = addedProjectList;
      return newState;
    case RECEIVE_PROJECT_ERRORS:
      newState.errors = action.errors;
      return newState;
    default:
      return state;
  }
};

export default ProjectReducer;
