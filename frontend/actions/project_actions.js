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
    project: project,
  };
};

export const receiveProjectErrors = (errors) => {
  return {
    type: RECEIVE_PROJECT_ERRORS,
    errors: errors,
  };
};

export const resetProjectErrors = () => {
  return {
    type: RECEIVE_PROJECT_ERRORS,
    errors: [],
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

export const createProject = (project) => {
  return (dispatch) => {
    return ProjectsAPIUtil.newProject(project).then(
      singleProject => dispatch(receiveOneProject(singleProject)),
      errors => dispatch(receiveProjectErrors(errors.responseJSON))
    );
  };
};

export const createProjectMember = (projectMember) => {
  return (dispatch) => {
    return ProjectsAPIUtil.newProjectMember(projectMember).then(
      singleProject => dispatch(receiveOneProject(singleProject)),
      errors => dispatch(receiveProjectErrors(errors.responseJSON))
    );
  };
};

export const deleteProjectMember = (projectMemberId) => {
  return (dispatch) => {
    return ProjectsAPIUtil.destroyProjectMember(projectMemberId).then(
      singleProject => dispatch(receiveOneProject(singleProject)),
      errors => dispatch(receiveProjectErrors(errors.responseJSON))
    );
  };
};
