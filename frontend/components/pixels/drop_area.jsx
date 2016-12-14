import React from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../../modules/dnd_item_types';

const pixelTarget = {
  hover(props) {
    console.log("hovered");
  },
  drop(props) {
    console.log("dropped");
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class DropArea extends React.Component{
  render() {
    return this.props.connectDropTarget(
      <div className='drop-area'>
      </div>
    );
  }
}

export default DropTarget(ItemTypes.PIXEL, pixelTarget, collect)(DropArea);
