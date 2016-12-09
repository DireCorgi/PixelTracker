import React from 'react';
import ProjectList from './project_list';
import ProjectFormContainer from './project_form_container';

class Projects extends React.Component {

  componentDidMount() {
    this.props.fetchProjects();
  }

  render() {
    return (
      <section className="projects-container">
        <header className="projects-list-header group">
          <h1>My Projects</h1>
          <ProjectFormContainer />
        </header>

        <ProjectList projects={this.props.projectList}/>
      </section>
    );
  }
}

export default Projects;
