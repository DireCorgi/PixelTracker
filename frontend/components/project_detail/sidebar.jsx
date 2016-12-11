import React from 'react';
import MembersContainer from '../projects/members_container';


class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { shrink: false };
    this.handleClick = this.handleClick.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidMount() {
    this.props.resetView();
  }

  componentWillUnmount() {
    this.props.resetView();
  }

  handleClick(e) {
    if (this.state.shrink) {
      this.setState({ shrink: false });
    } else {
      this.setState({ shrink: true });
    }
  }

  handleFilter(filterName) {
    return (e) => {
      const columnName = filterName;
      if (this.props.sidebar[columnName]) {
        this.props.hideColumn(columnName);
      } else {
        this.props.showColumn(columnName);
      }
    };
  }

  renderFilterListItem(filterName, filterContent) {
    const spanClassName = `sidebar-icon ${filterName}-icon`;
    let liClassName = '';
    if (this.props.sidebar[filterName]){
      liClassName += 'selected-filter';
    }
    return (
      <li
        onClick={this.handleFilter(filterName)}
        className={liClassName}>
        <span className={spanClassName}></span>
        {filterContent}
      </li>
    );
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

        <nav className="side-bar-nav">
          { this.renderFilterListItem('current', 'Current/Backlog') }
          { this.renderFilterListItem('icebox', 'Icebox') }
          { this.renderFilterListItem('done', 'Done') }
        </nav>

      </aside>
    );
  }
}

export default Sidebar;
