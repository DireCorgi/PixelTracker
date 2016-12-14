import React from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../../modules/dnd_item_types';

const pixelTarget = {
  drop(props, monitor, component) {
    console.log("dropped");
  },
  canDrop(props, monitor, component) {
    const item = monitor.getItem();
    if (item.pixelState === props.pixelState) {
      return true;
    }
    if (item.pixelState !== 'Unstarted' && props.pixelState !== 'Unstarted') {
      return true;
    }
    return false;
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

class PixelListItemDrop extends React.Component {

  render() {
    let areaClass = 'drop-area-list-item';
    if (this.props.isOver && this.props.canDrop) {
      areaClass += ' hovered-list-item';
    }

    return this.props.connectDropTarget(
      <div className={areaClass}>
        {this.props.children}
      </div>
    );
  }
}

export default DropTarget(
    ItemTypes.PIXEL,
    pixelTarget, collect
  )(PixelListItemDrop);
