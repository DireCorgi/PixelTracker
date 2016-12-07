export const newProject = (project) => {
  return $.ajax({
    url: '/api/projects/',
    method: 'POST',
    data: { project },
  });
};

export const fetchProjects = () => {
  return $.ajax({
    url: '/api/projects/',
    method: 'GET',
  });
};

export const fetchOneProject = (projectId) => {
  return $.ajax({
    url: `/api/projects/${projectId}`,
    method: 'GET',
  });
};

export const newProjectMember = ( projectMember ) => {
  return $.ajax({
    url: '/api/project_members/',
    method: 'POST',
    data: { project_member: projectMember },
  });
};

export const destroyProjectMember = (projectMemberId) => {
  return $.ajax({
    url: `/api/project_members/${projectMemberId}`,
    method: 'DELETE',
  });
};
