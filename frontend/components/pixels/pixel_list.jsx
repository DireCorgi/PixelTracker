import React from 'react';
import PixelPanelContainer from './pixel_panel_container';

class PixelList extends React.Component {
  render() {
    return (
      <section className="pixel-container">
        <PixelPanelContainer panelName="Done" />
        <PixelPanelContainer panelName="Current/Backlog" />
        <PixelPanelContainer panelName="Icebox" />
      </section>
    );
  }
}

export default PixelList;
