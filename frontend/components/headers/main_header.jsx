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
    } else if (this.props.pageLocation === 'signup' || this.props.pageLocation === 'login') {
      return (
        <ul>
          <li>{this.linkToOtherSession()}</li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li><Link to='/signup'>Signup</Link></li>
          <li><Link to='/login'>LogIn</Link></li>
        </ul>
      );
    }
  }

  linkToOtherSession() {
      if (this.props.pageLocation === 'login') {
        return (
          <Link to='/signup'>Sign Up</Link>
        );
      } else if (this.props.pageLocation === 'signup') {
        return (
          <Link to='/login'>Log In</Link>
        );
      }
  }

  render() {
    return (
      <header className="main-header">
        <h1 className="header-logo">Pixel Tracker</h1>

        <nav className="right-nav-list">
          { this.navItems() }
        </nav>
      </header>
    );
  }
}

export default MainHeader;
