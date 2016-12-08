import React from 'react';
import { Link } from 'react-router';

const ProjectListItem = ({ project }) => {
  return (
    <div className='project-detail group'>
      <a href="" >{project.name}</a>
      <button></button>
    </div>
  );
};

export default ProjectListItem;
