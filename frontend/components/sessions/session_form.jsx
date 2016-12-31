import React from 'react';
import { Link, withRouter } from 'react-router';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", email: "" };

    this.flavorText = "";

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGuestLogin = this.handleGuestLogin.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
  }

  header() {
    if (this.props.formType === 'login') {
      this.flavorText = "Log In";
      return (
        <h2>Log In</h2>
      );
    } else if (this.props.formType === 'signup') {
      this.flavorText = "Sign Up";
      return (
        <h2>Sign Up!</h2>
      );
    }
  }

  componentDidMount() {
    this.props.receiveNewHeaderType(this.props.formType);
  }

  componentDidUpdate() {
    this.redirectIfLoggedIn();
  }

  componentWillReceiveProps(newProps) {
    if (this.props.formType !== newProps.formType){
      this.props.resetErrors();
      this.props.receiveNewHeaderType(newProps.formType);
    }
  }

  componentWillUnmount() {
    this.props.receiveNewHeaderType('default');
  }

  redirectIfLoggedIn() {
    if (this.props.loggedIn) {
      this.props.router.push("/dashboard");
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

  emailInput() {
    if (this.props.formType === 'login') {
      return null;
    } else {
      return (
        <label>Email
          <input type='text' value={this.state.email} onChange={this.updateEmail}/>
        </label>
      );
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  handleGuestLogin(e) {
    e.preventDefault();
    this.props.processForm( { username: 'guest', password: 'starwars'} );
  }

  guestLogin() {
    let guestContent = "Try As Guest!";
    if (this.props.formType === 'login') guestContent = "Guest Login";
    return (
      <button className='guest-button' onClick={this.handleGuestLogin}>
        {guestContent}
      </button>
    );
  }

  isErrored(inputName) {
    let errorClass = "";
    this.props.errors.forEach((error)=> {
      if (error.includes(inputName)) {
        errorClass = "errored-input";
      }
    });
    return errorClass;
  }

  render() {

    return (
      <section className='session-form'>
        {this.header()}
        <form className='login-box' onSubmit={this.handleSubmit}>
          <label className={this.isErrored("Username")}>Username
            <input type='text' value={this.state.username} onChange={this.updateUsername} />
          </label>
            { this.emailInput() }
          <label className={this.isErrored("Password")}>Password
            <input type='password' value={this.state.password} onChange={this.updatePassword}/>
          </label>
          <input className='submit-button' type='submit' value={this.flavorText} />
          {this.guestLogin()}
        </form>
        {this.renderErrors()}
      </section>
    );
  }
}

export default withRouter(SessionForm);
