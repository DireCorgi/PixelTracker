import React from 'react';
import { Link } from 'react-router';
import MembersContainer from './members_container';

const ProjectListItem = ({ project }) => {
  let className = 'project-detail group';
  if (project.privacy) {
    className += ' private-project';
  }
  const projectUrl = `/projects/${project.id}`;

  return (
    <div className={className}>
      <Link to={projectUrl} >{project.name}</Link>
      <MembersContainer projectId={project.id}/>
    </div>
  );
};

export default ProjectListItem;
