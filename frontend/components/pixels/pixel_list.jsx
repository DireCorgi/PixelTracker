import React from 'react';
import PixelPanelContainer from './pixel_panel_container';

class PixelList extends React.Component {
  render() {
    const panels = [];
    if ( this.props.sidebar.done ) {
      panels.push(
        <PixelPanelContainer key="done"
          sidebarName="done"
          panelName="Done" />
      );
    }
    if (this.props.sidebar.current) {
      panels.push(
        <PixelPanelContainer
          key="current-backlog"
          sidebarName="current"
          panelName="Current/Backlog" />
      );
    }
    if (this.props.sidebar.icebox) {
      panels.push(
        <PixelPanelContainer
          key="icebox"
          sidebarName="icebox"
          panelName="Icebox" />
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
