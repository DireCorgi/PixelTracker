import React from 'react';

class Tour extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (this.props.headerType === 'default') {
      this.addProjectSteps();
    } else if (this.props.headerType === "project detail") {
      this.addPixelSteps();
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.headerType !== newProps.headerType) {
      this.props.clearSteps();
      if (newProps.headerType === 'default') {
        this.addProjectSteps();
      } else if (newProps.headerType === "project detail") {
        this.addPixelSteps();
      }
    }
    if (this.props.openPopup !== newProps.openPopup) {
      this.setState({ open: newProps.openPopup });
    }
  }

  addProjectSteps() {
    this.props.addSteps([
        {
          title: 'Dashboard',
          text: 'Welcome to Pixel Tracker, an agile project management tool created by Frank Ye. Here we are on the project dashboard.',
          selector: '.dashboard-header',
          position: 'bottom',
        },
        {
          text: 'On the main page you can create a new project.',
          selector: '#project-button',
          position: 'left',
        },
        {
          text: 'After you create a project you can manage the members by clicking on the member icon.',
          selector: '#member-button',
          position: 'left',
        },
        {
          text: 'You can navigate to the project page by clicking the project name.',
          selector: '#project-list',
          position: 'top-left',
        },
        {
          text: 'Now go ahead and create a new project or view a sample project by using the guest login. There is an additional tour for the project detail page.',
          selector: '#project-button',
          position: 'right',
        }
      ]
    );
  }

  addPixelSteps() {
    this.props.addSteps([
        {
          title: 'Project Page',
          text: 'Welcome to the Project Page. Here we can see all of our pixels (tickets) as well as our project name in the top left corner.',
          selector: '.dashboard-header',
          position: 'bottom',
        },
        {
          text: 'You can edit your members here.',
          selector: '#member-button',
          position: 'bottom-left',
        },
        {
          text: 'Create a new pixel by clicking this button.',
          selector: '#newPixel',
          position: 'bottom-left',
        },
        {
          text: 'The remaining buttons will filter the columns.',
          selector: '#current',
          position: 'bottom-left',
        },
        {
          text: 'You can also close the panels by clicking the X.',
          selector: '#close-button',
          position: 'bottom-left',
        },
        {
          text: 'This panel is the Icebox. Any newly created pixels will be placed here. This panel is for any tickets that have not been started nor looked at by anyone. Once someone has delegated the work, these should be moved to the Current/Backlog panel.',
          selector: '#Ice',
          position: 'left',
        },
        {
          text: 'This panel is the Current/Backlog. Here will be your working space. Any pixel that is currently being worked on should be placed here.',
          selector: '#Cur',
          position: 'left',
        },
        {
          text: 'You can drag and drop unstarted pixels between the Icebox and Current/Backlog.',
          selector: '#Ice',
          position: 'left',
        },
        {
          text: 'You can also drag and drop started pixels to change their order. Pixels that are higher up should be given more prioriety.',
          selector: '#Cur',
          position: 'left',
        },
        {
          text: 'This is the Done panel. Any Pixel that is accepted will be placed in here. You can still edit the pixel and change its state by clicking the drop down to enter edit mode.',
          selector: '#Don',
          position: 'right',
        },
        {
          text: 'Now go ahead and create a new pixel to get started! Thank you for using Pixel Tracker.',
          selector: '#newPixel',
          position: 'bottom-left',
        }
      ]
    );
  }

  handleClick(e) {
    this.setState({ open: false });
  }

  render() {
    let className = "take-tour tour-hidden";
    if(this.state.open) className = "take-tour";
    return(
      <section className={className}>
        Welcome {this.props.currentUser.username}! Take a tour to learn more about Pixel Tracker.
        <nav className="bottom-tour-links group">
          <button onClick={this.props.startTour} id="start-tour">Start Tour</button>
          <button onClick={this.handleClick}>Close</button>
        </nav>
      </section>
    );
  }

}

export default Tour;
