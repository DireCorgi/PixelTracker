import React from 'react';
import MembersContainer from '../projects/members_container';


class Sidebar extends React.Component {
  renderMemberNumbers() {
    let projectMembers = 0;
    const curProject = this.props.projectList[this.props.projectId];
    if (curProject) {
      projectMembers += curProject.members.length;
    }
    return projectMembers;
  }

  render() {
    return(
      <aside className="side-bar">
        <header className="side-bar-header">
          <MembersContainer projectId={this.props.projectId}/>
          <span>{this.renderMemberNumbers()}</span>
        </header>

      </aside>
    );
  }
}

export default Sidebar;
