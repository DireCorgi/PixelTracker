import React from 'react';
import { Link } from 'react-router';

const ProjectListItem = ({ project }) => {
  let className = 'project-detail group';
  if (project.privacy) {
    className += ' private-project';
  }

  return (
    <div className={className}>
      <a href="" >{project.name}</a>
      <button></button>
    </div>
  );
};

export default ProjectListItem;
