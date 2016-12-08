import * as ProjectsAPIUtil from '../util/projects_api_util.js';

export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const RECEIVE_ONE_PROJECT = 'RECEIVE_PROJECT';
export const RECEIVE_PROJECT_ERRORS = 'RECEIVE_PROJECT_ERRORS';

export const receiveProjects = (projects) => {
  return {
    type: RECEIVE_PROJECTS,
    projects: projects,
  };
};

export const receiveOneProject = (project) => {
  return {
    type: RECEIVE_ONE_PROJECT,
    projects: project,
  };
};

export const receiveProjectErrors = (errors) => {
  return {
    type: RECEIVE_PROJECT_ERRORS,
    errors: errors,
  };
};

export const fetchProjects = () => {
  return (dispatch) => {
    return ProjectsAPIUtil.fetchProjects().then(
      projects => dispatch(receiveProjects(projects)),
      errors => dispatch(receiveProjectErrors(errors.responseJSON))
    );
  };
};

export const fetchOneProjects = (projectId) => {
  return (dispatch) => {
    return ProjectsAPIUtil.fetchOneProject(projectId).then(
      project => dispatch(receiveProjects(project)),
      errors => dispatch(receiveProjectErrors(errors.responseJSON))
    );
  };
};
