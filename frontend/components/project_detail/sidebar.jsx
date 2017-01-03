import React from 'react';
import MembersContainer from '../projects/members_container';
import FilterListItem from './filter_list_item';

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
      if (filterName === 'newPixel') {
        this.props.showColumn('icebox');
      }
      if (this.props.sidebar[columnName]) {
        this.props.hideColumn(columnName);
      } else {
        this.props.showColumn(columnName);
      }
    };
  }

  countMemberNumbers() {
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
          <span>{this.countMemberNumbers()}</span>
        </header>

        <nav className="side-bar-nav">
          <FilterListItem
            filterName="newPixel"
            filterContent="New Pixel"
            sidebar={this.props.sidebar["newPixel"]}
            handleFilter={this.handleFilter} />
          <FilterListItem
            filterName="current"
            filterContent="Current/Backlog"
            sidebar={this.props.sidebar["current"]}
            handleFilter={this.handleFilter} />
          <FilterListItem
            filterName="icebox"
            filterContent="Icebox"
            sidebar={this.props.sidebar["icebox"]}
            handleFilter={this.handleFilter}/>
          <FilterListItem
            filterName="done"
            filterContent="Done"
            sidebar={this.props.sidebar["done"]}
            handleFilter={this.handleFilter}/>
        </nav>

      </aside>
    );
  }
}

export default Sidebar;
