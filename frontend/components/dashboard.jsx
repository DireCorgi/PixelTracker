import React from 'react';
import DashboardHeaderContainer from './headers/dashboard_header_container';
import ProjectsContainer from './projects/projects_container';

const Dashboard = ({ children }) => {
  return (
    <div className="main-dashboard-container">
      <DashboardHeaderContainer />
      <main className="main-dashboard-content">
        <ProjectsContainer />
        { children }
      </main>
    </div>
  );
};

export default Dashboard;
