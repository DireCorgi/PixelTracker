import React from 'react';

const Dashboard = ({ children }) => {
  return (
    <div className="main-dashboard-container">
      <h1>Dashboard</h1>
      <main className="main-dashboard-content">
        { children }
      </main>
    </div>
  );
};

export default Dashboard;
