import React from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../../modules/dnd_item_types';

const pixelTarget = {
  drop(props, monitor, component) {
    const pixel = monitor.getItem();
    if (pixel.icebox) {
      props.updatePixel(
        pixel.pixelId,
        { icebox: false, pixel_ord: (props.ords.maxUnstarted + 1) }
      );
    } else if (pixel.pixelState === 'Unstarted') {
      props.updatePixel(
        pixel.pixelId,
        { icebox: true, pixel_ord: (props.ords.maxIcebox + 1) }
      );
    }
  },
  canDrop(props, monitor, component) {
    const item = monitor.getItem();
    if (props.areaType === "Current/Backlog") {
      return item.icebox === true;
    }
    if (props.areaType === "Icebox") {
      return (!item.icebox && item.pixelState === 'Unstarted');
    }
    return false;
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}

class DropArea extends React.Component {

  render() {
    if (this.props.areaType === 'Done') {
      return null;
    }

    let areaClass = 'drop-area';
    if (this.props.canDrop && this.props.isOver) {
      areaClass += ' hovered-container';
    }

    return this.props.connectDropTarget(
      <div className={areaClass}>
      </div>
    );
  }
}

export default DropTarget(ItemTypes.PIXEL, pixelTarget, collect)(DropArea);
