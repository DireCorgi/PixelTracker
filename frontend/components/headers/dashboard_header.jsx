import React from 'react';

class DashboardHeader extends React.Component {
  render() {
    return(
      <header className="application-header dashboard-header group">
        <h1 className="header-logo-light">
          PixelTracker
        </h1>

        <nav className="right-nav-list-dashboard">
          <div className="username-header">
            { this.props.currentUser.username }
            <ul className="hidden-username-nav">
              <li><button>logout</button></li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default DashboardHeader;
