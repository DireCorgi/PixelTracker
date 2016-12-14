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
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    item: monitor.getItem(),
  };
}

class DropArea extends React.Component {

  render() {
    let areaClass = 'drop-area';
    if (this.props.item) {
      if (this.props.isOver && this.props.item.icebox === true) {
        areaClass += ' hovered-container';
      }
    }

    return this.props.connectDropTarget(
      <div className={areaClass}>
      </div>
    );
  }
}

export default DropTarget(ItemTypes.PIXEL, pixelTarget, collect)(DropArea);
