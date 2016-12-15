import React from 'react';
import DashBoardHeaderContainer from '../headers/dashboard_header_container';
import SidebarContainer from './sidebar_container';
import { RainbowSpinner } from '../spinners/spinners';
import PrivatePage from './private_page';
import PixelListContainer from '../pixels/pixel_list_container';

class ProjectDetail extends React.Component {
  componentDidMount() {
    this.props.changeHeader('project detail');
    this.props.fetchPixels(this.props.params.projectId);
    if (!this.props.projectsList[this.props.params.projectId])
      this.props.fetchProject(this.props.params.projectId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.projectId !== nextProps.params.projectId) {
      this.props.resetProjectErrors();
      this.props.resetPixels();
      this.props.fetchPixels(nextProps.params.projectId);
      if (!this.props.projectsList[nextProps.params.projectId])
        this.props.fetchProject(nextProps.params.projectId);
    }
  }

  componentWillUnmount() {
    this.props.resetProjectErrors();
    this.props.resetPixels();
    this.props.changeHeader('default');
  }

  renderStories() {
    if (this.props.loading || this.props.pixelsLoading) {
      return (
        <figure><RainbowSpinner /></figure>
      );
    }
    if (this.props.errors) {
      if (this.props.errors[0] === 'Project Not Found or Private') {
        return (<PrivatePage />);
      }
    }
    return (
      <div className="main-content-container">
        <SidebarContainer projectId={this.props.params.projectId}/>
        <PixelListContainer projectId={this.props.params.projectId}/>
      </div>
    );
  }

  render() {
    return (
      <main className='project-detail-container group'>
        <DashBoardHeaderContainer projectId={this.props.params.projectId}/>
        {this.renderStories()}
      </main>
    );
  }
}

export default ProjectDetail;
