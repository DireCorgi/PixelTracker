import React from 'react';
import { Link } from 'react-router';
import Members from './members';

const ProjectListItem = ({ project }) => {
  let className = 'project-detail group';
  if (project.privacy) {
    className += ' private-project';
  }

  return (
    <div className={className}>
      <a href="" >{project.name}</a>
      <Members projectId={project.id}/>
    </div>
  );
};

export default ProjectListItem;
