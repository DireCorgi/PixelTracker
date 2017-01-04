import React from 'react';
import DashboardHeaderContainer from './headers/dashboard_header_container';
import ProjectsContainer from './projects/projects_container';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const state = this.state;
    return (
      <div className="main-dashboard-container">
        <DashboardHeaderContainer />
        <main className="main-dashboard-content">
          <ProjectsContainer />
          { this.props.children }
        </main>
      </div>
    );
  }
}

export default Dashboard;
