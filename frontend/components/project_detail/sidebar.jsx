import React from 'react';
import MembersContainer from '../projects/members_container';


class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { shrink: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (this.state.shrink) {
      this.setState({ shrink: false });
    } else {
      this.setState({ shrink: true });
    }
  }

  renderMemberNumbers() {
    let projectMembers = 0;
    const curProject = this.props.projectList[this.props.projectId];
    if (curProject) {
      projectMembers += curProject.members.length;
    }
    return projectMembers;
  }

  render() {
    let sideBarClass = 'side-bar';
    if(this.state.shrink) {
      sideBarClass += ' shrink';
    }
    return(
      <aside className={sideBarClass}>
        <div className="side-bar-shrink">
          <button onClick={this.handleClick}></button>
        </div>
        <header className="side-bar-header">
          <MembersContainer projectId={this.props.projectId}/>
          <span>{this.renderMemberNumbers()}</span>
        </header>

      </aside>
    );
  }
}

export default Sidebar;
