import React from 'react';
import DashBoardHeaderContainer from '../headers/dashboard_header_container';
import SidebarContainer from './sidebar_container';
import { RainbowSpinner } from '../spinners/spinners';

class ProjectDetail extends React.Component {
  componentDidMount() {
    this.props.changeHeader('project detail');
    if (!this.props.projectsList[this.props.params.projectId])
      this.props.fetchProject(this.props.params.projectId);
  }

  componentWillUnmount() {
    this.props.changeHeader('default');
  }

  renderStories() {
    if (this.props.loading) {
      return (
        <figure><RainbowSpinner /></figure>
      );
    } else {
      return (
        <div className="main-content-container">
          <SidebarContainer projectId={this.props.params.projectId}/>
          <section className="stories-container">
            Stories go here
          </section>
        </div>
      );
    }
  }

  render() {
    return (
      <main className='project-detail-container group'>
        <DashBoardHeaderContainer projectId={this.props.params.projectId}/>
        {this.renderStories()}
      </main>
    );
  }
}

export default ProjectDetail;
