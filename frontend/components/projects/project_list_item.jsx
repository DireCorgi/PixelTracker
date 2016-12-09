import React from 'react';
import { Link } from 'react-router';
import MembersContainer from './members_container';

const ProjectListItem = ({ project }) => {
  let className = 'project-detail group';
  if (project.privacy) {
    className += ' private-project';
  }

  return (
    <div className={className}>
      <a href="" >{project.name}</a>
      <MembersContainer projectId={project.id}/>
    </div>
  );
};

export default ProjectListItem;
