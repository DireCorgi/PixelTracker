import React from 'react';
import DashBoardHeaderContainer from '../headers/dashboard_header_container';
import Sidebar from './sidebar';

class ProjectDetail extends React.Component {
  componentDidMount() {
    if (!this.props.projectsList[this.props.params.projectId])
      this.props.fetchProject(this.props.params.projectId);
  }

  render() {
    return (
      <main className='project-detail-container'>
        <DashBoardHeaderContainer />
        <Sidebar />

      </main>
    );
  }
}

export default ProjectDetail;
