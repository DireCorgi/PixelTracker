import React from 'react';
import PixelListItemContainer from './pixel_list_item_container';
import PixelFormContainer from './pixel_form_container';
import { Spinner } from '../spinners/spinners';
import DropArea from './drop_area';
import { ItemTypes } from '../../modules/dnd_item_types';
import { DropTarget } from 'react-dnd';

const pixelTarget = {
  drop(props, monitor, component) {
    const pixel = monitor.getItem();
    if (pixel.icebox) {
      props.updatePixel(
        pixel.pixelId,
        { icebox: false, pixel_ord: (props.ords.maxUnstarted + 1) }
      );
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}


class PixelPanel extends React.Component {
  constructor(props) {
    super(props);
    this.listLength = 0;
    this.handleClick = this.handleClick.bind(this);
  }

  pixelSummary() {
    let mapPixels = [];
    const unStartedPixels = [];
    const startedPixels = [];
    let maxOrd = 0;
    this.props.pixels.forEach((pixel)=> {
      if (this.props.panelName === 'Icebox'){
        if (pixel.icebox) {
          mapPixels.push(<li key={pixel.id}><PixelListItemContainer pixelId={pixel.id} /></li>);
          maxOrd = pixel.pixel_ord;
        }
      } else if (this.props.panelName === 'Current/Backlog') {
        if ( !pixel.icebox && pixel.state !== 'Accepted' ) {
          if (pixel.state === 'Unstarted') {
            unStartedPixels.push(<li key={pixel.id}><PixelListItemContainer pixelId={pixel.id} /></li>);
          } else {
            startedPixels.push(<li key={pixel.id}><PixelListItemContainer pixelId={pixel.id} /></li>);
          }
        }
      } else if (this.props.panelName === 'Done') {
        if (pixel.state === 'Accepted'){
          mapPixels.push(<li key={pixel.id}><PixelListItemContainer pixelId={pixel.id} /></li>);
        }
      }
    });
    if (unStartedPixels.length > 0 || startedPixels.length > 0) {
      mapPixels = startedPixels.concat(unStartedPixels);
    }
    this.listLength = maxOrd;
    return (
      <ul>
        {mapPixels}
      </ul>
    );
  }

  handleClick(e) {
    this.props.hideColumn(this.props.sidebarName);
  }

  renderPixelForm() {
    if (this.props.panelName === 'Icebox' && this.props.sidebar.newPixel) {
      return (
        <PixelFormContainer
          projectId={this.props.projectId}
          pixelOrd={this.listLength + 1}
          formType="create"/>
      );
    } else {
      return null;
    }
  }

  render() {
    let panelClass = 'panel-container';
    if (this.props.isOver && this.props.panelName === "Current/Backlog") {
      panelClass += ' hovered-container';
    }
    let dropArea = null;
    if (this.props.panelName === 'Current/Backlog') {
      dropArea = <DropArea ords={this.props.ords} updatePixel={this.props.updatePixel}/>;
    }

    return this.props.connectDropTarget(
      <article className={panelClass}>
        <header className="panel-header">
          <button onClick={this.handleClick}></button>
          { this.props.panelName }
        </header>
        {this.renderPixelForm()}
        <section className="panel-list">
          {this.pixelSummary()}
        </section>
        { dropArea }
      </article>
    );
  }
}

export default DropTarget(ItemTypes.PIXEL, pixelTarget, collect)(PixelPanel);
