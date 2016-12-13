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

export const selectAllPixels = (state) => {
  const pixelList = state.pixels.pixelList;
  const pixelListArray = values(pixelList);
  pixelListArray.sort((a, b) => {
    if (a.pixel_ord > b.pixel_ord ) {
      return 1;
    }
    if (a.pixel_ord < b.pixel_ord) {
      return -1;
    }
    return 0;
  });
  return pixelListArray;
};
