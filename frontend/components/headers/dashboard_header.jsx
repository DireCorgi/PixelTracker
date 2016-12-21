import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router';
import ErrorsHeader from './errors_header';

class DashboardHeader extends React.Component {

  constructor(props) {
    super(props);

    this.state = { userNav: false };

    this.toggleUserNav = this.toggleUserNav.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.currentUser === null) {
      this.props.router.push("/");
    }
  }

  toggleUserNav() {
    const curNav = this.state.userNav;
    const newNav = curNav === false;
    this.setState({ userNav: newNav });
  }

  renderIcon() {
    const defaultRender = "PixelTracker";
    if (this.props.headerType === "project detail") {
      if (this.props.projectList[this.props.projectId]) {
        const projectName = this.props.projectList[this.props.projectId].name;
        return projectName;
      }
    } else {
      return defaultRender;
    }
  }

  render() {
    let user = this.props.currentUser;
    if (user === null) {
      user = { username: 'none' };
    }

    let hiddenUsernameClass = 'hidden-username-nav';
    if (this.state.userNav) {
      hiddenUsernameClass += ' display-nav';
    }

    let errorsHeader = null;
    if (this.props.dragErrors) {
      errorsHeader = <ErrorsHeader clearErrors={this.props.clearErrors}/>;
    }

    return(
      <header className="application-header dashboard-header group">
        <h1 className="header-logo-light">
          <Link to="/dashboard">
            <img src={ window.lightLogoPath } alt="icon-light" />
          </Link>
          {this.renderIcon()}
        </h1>
        {errorsHeader}
        <nav className="right-nav-list-dashboard group">
          <Link to="/dashboard">Dashboard</Link>
          <div className="username-header" onClick={this.toggleUserNav}>{ user.username }
            <nav className={ hiddenUsernameClass }>
              <li onClick={this.props.logout}>Log Out</li>
            </nav>
          </div>
        </nav>
      </header>
    );
  }
}

export default withRouter(DashboardHeader);
