import { values } from 'lodash';

export const selectAllProjects = (state) => {
  const projectList = state.projects.projectList;
  const projectListArray = values(projectList);
  projectListArray.sort((a, b) => {
    if (a.updated_at > b.updated_at ) {
      return -1;
    }
    if (a.updated_at < b.updated_at) {
      return 1;
    }
    return 0;
  });
  return projectListArray;
};
