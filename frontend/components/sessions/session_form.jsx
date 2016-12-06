import React from 'react';
import { Link, withRouter } from 'react-router';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", email: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
  }

  header() {
    if (this.props.formType === 'login') {
      return (
        <h1>Login</h1>
      );
    } else if (this.props.formType === 'signup') {
      return (
        <h1>Signup</h1>
      );
    }
  }

linkToOther() {
    if (linkType === 'login') {
      return (
        <Link to='/signup'>Sign Up</Link>
      );
    } else if (linkType === 'signup') {
      return (
        <Link to='/login'>Log In</Link>
      );
    }
  }

  componentDidUpdate() {
    this.redirectIfLoggedIn();
  }

  redirectIfLoggedIn() {
    if (this.props.loggedIn) {
      this.props.router.push("/");
    }
  }

  renderErrors() {
    return (
      <ul className="error-display">
        { this.props.errors.map(
          (error, idx) => (
            <li key={`${idx}-${error}`}>{error}</li>
          )
        ) }
      </ul>
    );
  }

  updateUsername(e) {
    this.setState({
      username: e.currentTarget.value
    });
  }

  updatePassword(e) {
    this.setState({
      password: e.currentTarget.value
    });
  }

  updateEmail(e) {
    this.setState({
      email: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  render() {
    return (
      <section className='session-form'>
        {this.header()}
        <form className='login-box' onSubmit={this.handleSubmit}>
          <label>Username
            <input type='text' value={this.state.username} onChange={this.updateUsername} />
          </label>
          <label>Password
            <input type='password' value={this.state.password} onChange={this.updatePassword}/>
          </label>
          <input className='submit-button' type='submit' value='submit' />
        </form>
        {this.renderErrors()}
      </section>
    );
  }
}

export default withRouter(SessionForm);
