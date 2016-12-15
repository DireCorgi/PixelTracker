import React from 'react';
import PixelPanelContainer from './pixel_panel_container';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class PixelList extends React.Component {
  componentDidMount() {
    let maxIcebox = 0;
    let maxBacklog = 0;
    let maxDone = 0;
    let maxUnstarted = 0;
    this.props.pixels.forEach((pixel)=> {
      if (pixel.icebox) {
        maxIcebox = pixel.pixel_ord;
      } else if (!pixel.icebox && pixel.state !== 'Accepted') {
        if (pixel.state === 'Unstarted') {
          maxUnstarted = pixel.pixel_ord;
        } else {
          maxBacklog = pixel.pixel_ord;
        }
        maxBacklog = pixel.pixel_ord;
      } else if (pixel.state === 'Accepted') {
        maxDone = pixel.pixel_ord;
      }
    });
    this.props.updateMaxOrds(maxIcebox, maxBacklog, maxDone, maxUnstarted);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pixelList !== this.props.pixelList) {
      let maxIcebox = 0;
      let maxBacklog = 0;
      let maxDone = 0;
      let maxUnstarted = 0;
      nextProps.pixels.forEach((pixel)=> {
        if (pixel.icebox) {
          maxIcebox = pixel.pixel_ord;
        } else if (!pixel.icebox && pixel.state !== 'Accepted') {
          if (pixel.state === 'Unstarted') {
            maxUnstarted = pixel.pixel_ord;
          } else {
            maxBacklog = pixel.pixel_ord;
          }
          maxBacklog = pixel.pixel_ord;
        } else if (pixel.state === 'Accepted') {
          maxDone = pixel.pixel_ord;
        }
      });
      this.props.updateMaxOrds(maxIcebox, maxBacklog, maxDone, maxUnstarted);
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

export default DragDropContext(HTML5Backend)(PixelList);
