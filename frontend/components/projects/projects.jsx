import React from 'react';
import ProjectList from './project_list';
import ProjectFormContainer from './project_form_container';
import { RainbowSpinner } from '../spinners/spinners';

class Projects extends React.Component {

  componentDidMount() {
    this.props.fetchProjects();
  }

  renderProjects(){
    if (this.props.loading) {
      return (
        <figure className="dashboard-loader"><RainbowSpinner/></figure>
      );
    } else {
      return (
        <ProjectList projects={this.props.projectList}/>
      );
    }
  }

  render() {
    return (
      <section className="projects-container">
        <header className="projects-list-header group">
          <h1>My Projects</h1>
          <ProjectFormContainer />
        </header>

        {this.renderProjects()}
      </section>
    );
  }
}

export default Projects;
