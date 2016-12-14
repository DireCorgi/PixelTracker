import React from 'react';
import PixelPanelContainer from './pixel_panel_container';

class PixelList extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.pixelList !== this.props.pixelList) {
      let maxIcebox = 0;
      let maxBacklog = 0;
      let maxDone = 0;
      nextProps.pixels.forEach((pixel)=> {
        if (pixel.icebox) {
          maxIcebox = pixel.pixel_ord;
        } else if (!pixel.icebox && pixel.state !== 'Accepted') {
          maxBacklog = pixel.pixel_ord;
        } else if (pixel.state === 'Accepted') {
          maxDone = pixel.pixel_ord;
        }
      });
      this.props.updateMaxOrds(maxIcebox, maxBacklog, maxDone);
    }
  }

  render() {
    const panels = [];
    if ( this.props.sidebar.done ) {
      panels.push(
        <PixelPanelContainer key="done"
          sidebarName="done"
          panelName="Done"
          projectId={this.props.projectId} />
      );
    }
    if (this.props.sidebar.current) {
      panels.push(
        <PixelPanelContainer
          key="current-backlog"
          sidebarName="current"
          panelName="Current/Backlog"
          projectId={this.props.projectId} />
      );
    }
    if (this.props.sidebar.icebox) {
      panels.push(
        <PixelPanelContainer
          key="icebox"
          sidebarName="icebox"
          panelName="Icebox"
          projectId={this.props.projectId} />
      );
    }

    return (
      <section className="pixel-container">
        {panels}
      </section>
    );
  }
}

export default PixelList;
