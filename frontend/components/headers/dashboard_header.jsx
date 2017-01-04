import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router';
import ErrorsHeader from './errors_header';
import Joyride from 'react-joyride';
import Tour from './tour';

class DashboardHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      joyrideOverlay: true,
      joyrideType: 'continuous',
      ready: false,
      steps: [],
      userNav: false,
    };

    this.toggleUserNav = this.toggleUserNav.bind(this);
    this.addSteps = this.addSteps.bind(this);
    this.addTooltip = this.addTooltip.bind(this);
    this.startTour = this.startTour.bind(this);
    this.clearSteps = this.clearSteps.bind(this);
  }

  componentDidMount() {
    if (this.props.currentUser.username === 'guest' && !this.props.tooltip) {
      this.setState({ openPopup: true });
      this.props.changeHeader(this.props.headerType, true);
    }
    this.setState({ ready: true });
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

  addTooltip(data) {
    this.joyride.addTooltip(data);
  }

  addSteps(steps) {
    const joyride = this.joyride;
    let newSteps = steps;

    if (!Array.isArray(newSteps)) {
      newSteps = [newSteps];
    }

    if (!newSteps.length) {
      return;
    }

    this.setState(currentState => {
      currentState.steps = currentState.steps.concat(newSteps);
      return currentState;
    });
  }

  clearSteps() {
    this.setState({ ready: false, steps: [] });
    setTimeout(() => { this.setState({ ready: true }); }, 1000);
  }

  startTour() {
    this.setState({ openPopup: false });
    this.joyride.reset();
    this.joyride.start(true);
  }


  render() {
    let user = this.props.currentUser;
    if (user === null) user = { username: 'none' };

    let hiddenUsernameClass = 'hidden-username-nav';
    if (this.state.userNav) hiddenUsernameClass += ' display-nav';

    let errorsHeader = null;
    if (this.props.dragErrors)
      errorsHeader = <ErrorsHeader clearErrors={this.props.clearErrors}/>;

    const state = this.state;
    return(
      <header className="application-header dashboard-header group">
        <Joyride
           ref={c => (this.joyride = c)}
           steps={state.steps}
           type={state.joyrideType}
           debug={false}
           locale={{
             back: (<span className="black-button">Back</span>),
             close: (<span className="black-button">Close</span>),
             last: (<span>Finish</span>),
             next: (<span>Next</span>),
             skip: (<span className="black-button">Skip</span>)
           }}
           showSkipButton={true}
           showStepsProgress={true}
           showOverlay={state.joyrideOverlay} />
        <h1 className="header-logo-light">
          <Link to="/dashboard">
            <img src={ window.lightLogoPath } alt="icon-light" />
          </Link>
          {this.renderIcon()}
        </h1>
        {errorsHeader}
        <nav className="right-nav-list-dashboard group">
          <div className="tour-group">
            <a onClick={this.startTour} className="tour-link">Take a Tour</a>
            <Tour
            headerType={this.props.headerType}
            addSteps={this.addSteps}
            clearSteps={this.clearSteps}
            startTour={this.startTour}
            currentUser={this.props.currentUser}
            openPopup={this.state.openPopup}/>
          </div>
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
