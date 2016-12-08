import React from 'react';
import { withRouter } from 'react-router';

class DashboardHeader extends React.Component {

  constructor(props) {
    super(props);

    this.state = { userNav: false };

    this.logoutAndRedirectUser = this.logoutAndRedirectUser.bind(this);
    this.toggleUserNav = this.toggleUserNav.bind(this);
  }

  logoutAndRedirectUser(){
    this.props.logout();
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


  render() {
    let user = this.props.currentUser;
    if (user === null) {
      user = { username: 'none' };
    }

    let hiddenUsernameClass = 'hidden-username-nav';
    if (this.state.userNav) {
      hiddenUsernameClass += ' display-nav';
    }

    return(
      <header className="application-header dashboard-header group">
        <h1 className="header-logo-light">
          <img src={ window.lightLogoPath } alt="icon-light" />PixelTracker
        </h1>

        <nav className="right-nav-list-dashboard">
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
