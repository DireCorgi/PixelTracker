import React from 'react';
import { Link } from 'react-router';

class MainHeader extends React.Component {

  loggedIn(){
    if (this.props.currentUser) {
      return true;
    } else{
      return false;
    }
  }

  navItems() {
    if (this.loggedIn()) {
      return (
        <ul>
          <li>{ this.props.currentUser.username }
            <nav className="username-dropdown">
              <button onClick={this.props.logout}>Logout</button>
            </nav>
          </li>
        </ul>
      );
    } else if (this.props.headerType === 'signup' || this.props.headerType === 'login') {
      return (
        <ul>
          <li>{this.linkToOtherSession()}</li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li><Link to='/login'>Log in</Link></li>
          <li className="sign-up-link"><Link to='/signup'>Sign up</Link></li>
        </ul>
      );
    }
  }

  linkToOtherSession() {
      if (this.props.headerType === 'login') {
        return (
          <Link to='/signup'>Sign Up</Link>
        );
      } else if (this.props.headerType === 'signup') {
        return (
          <Link to='/login'>Log In</Link>
        );
      }
  }

  render() {
    return (
      <header className="main-header">
        <div className="header-container group">
          <h1 className="header-logo">Pixel Tracker</h1>

          <nav className="right-nav-list group">
            { this.navItems() }
          </nav>
        </div>
      </header>
    );
  }
}

export default MainHeader;
