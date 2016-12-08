import { values } from 'lodash';

export const selectAllProjects = (state) => {
  const projectList = state.projects.projectList;
  return values(projectList);
};
