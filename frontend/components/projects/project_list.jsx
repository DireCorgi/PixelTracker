import React from 'react';
import ProjectListItem from './project_list_item';


class ProjectList extends React.Component {
  render() {
    const fullList = this.props.projects.map((project) => {
      return (<ProjectListItem key={project.id} project={project} />);
    });

    return (
      <section id='project-list' className='project-list'>
        <ul>
          {fullList}
        </ul>
      </section>
    );
  }
}

export default ProjectList;
