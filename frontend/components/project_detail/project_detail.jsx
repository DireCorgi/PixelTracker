import React from 'react';
import DashBoardHeaderContainer from '../headers/dashboard_header_container';
import Sidebar from './sidebar';
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
        <section className="stories-container">
          Stories go here
        </section>
      );
    }
  }

  render() {
    return (
      <main className='project-detail-container group'>
        <DashBoardHeaderContainer projectId={this.props.params.projectId}/>
        <Sidebar />
        {this.renderStories()}
      </main>
    );
  }
}

export default ProjectDetail;
