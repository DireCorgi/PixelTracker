import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router';
import ErrorsHeader from './errors_header';
import Joyride from 'react-joyride';

class DashboardHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      joyrideOverlay: true,
      joyrideType: 'continuous',
      ready: false,
      steps: [],
      userNav: false
    };

    this.toggleUserNav = this.toggleUserNav.bind(this);
    this.addSteps = this.addSteps.bind(this);
    this.addTooltip = this.addTooltip.bind(this);
    this.startTour = this.startTour.bind(this);
    this.clearSteps = this.clearSteps.bind(this);
    this.addProjectSteps = this.addProjectSteps.bind(this);
  }

  componentDidMount() {
    setTimeout(() => { this.setState({ ready: true }); }, 1000);
    if (this.props.headerType === 'default') {
      this.addProjectSteps();
    } else if (this.props.headerType === "project detail") {
      this.addPixelSteps();
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.currentUser === null) {
      this.props.router.push("/");
    }
    if(this.props.headerType !== newProps.headerType) {
      this.clearSteps();
      if (newProps.headerType === 'default') {
        this.addProjectSteps();
      } else if (newProps.headerType === "project detail") {
        this.addPixelSteps();
      }
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

  addProjectSteps() {
    this.addSteps([
        {
          title: 'Dashboard',
          text: 'On the main page you can create a new project',
          selector: '#project-button',
          position: 'left',
        },
        {
          title: 'Dashboard',
          text: 'After you create a project you can manage the members by clicking on the member icon',
          selector: '#member-button',
          position: 'left',
        },
        {
          title: 'Dashboard',
          text: 'You can navigate to the main project page by clicking the project name',
          selector: '#project-link',
          position: 'right',
        }
      ]
    );
  }

  addPixelSteps() {
    this.addSteps([
        {
          title: 'Project Page',
          text: 'You can edit your members here',
          selector: '#member-button',
          position: 'right',
        },
        {
          title: 'Project Page',
          text: 'Create a new pixel by clicking this button',
          selector: '#newPixel',
          position: 'right',
        }
      ]
    );
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
    this.joyride.reset();
    this.joyride.start(true);
  }

  callback(options) {

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
             last: (<span>Last</span>),
             next: (<span>Next</span>),
             skip: (<span className="black-button">Skip</span>)
           }}
           showSkipButton={true}
           showStepsProgress={true}
           showOverlay={state.joyrideOverlay}
           callback={this.callback} />
        <h1 className="header-logo-light">
          <Link to="/dashboard">
            <img src={ window.lightLogoPath } alt="icon-light" />
          </Link>
          {this.renderIcon()}
        </h1>
        {errorsHeader}
        <nav className="right-nav-list-dashboard group">
          <Link to="/dashboard">Dashboard</Link>
          <a onClick={this.startTour}>Tour</a>
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
