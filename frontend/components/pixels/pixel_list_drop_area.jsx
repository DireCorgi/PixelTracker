import React from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../../modules/dnd_item_types';

const pixelTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    if (item.pixelId === props.pixelId) {
      return;
    }

    function updateOrder(icebox, callback) {
      const pixels = [];
      let index = 1;
      let doneIndex = 1;
      props.allPixels.forEach((pixel) => {
        if (callback(pixel)) {
          if (pixel.id === props.pixelId) {
            const currentPixel = {};
            currentPixel.id = item.pixelId;
            currentPixel.icebox = icebox;
            currentPixel.pixel_ord = index;
            index += 1;
            pixels.push(currentPixel);
          }
          const newPixel = {};
          newPixel.id = pixel.id;
          newPixel.icebox = icebox;
          newPixel.pixel_ord = index;
          index += 1;
          pixels.push(newPixel);
        }
        if (pixel.state === 'Accepted') {
          const newPixel = {};
          newPixel.id = pixel.id;
          newPixel.icebox = false;
          newPixel.pixel_ord = doneIndex;
          doneIndex += 1;
          pixels.push(newPixel);
        }
      });
      props.updateMassPixels(pixels);
      item.startLoading();
      const newPixels = {};
      pixels.forEach((pixel) => {
        newPixels[pixel.id] = { icebox: icebox, pixel_ord: pixel.pixel_ord };
      });
      props.massUpdatePixel(newPixels).then(
        () => item.finishLoading(),
        () => item.finishLoading()
      );
    }

    if (props.icebox) {
      const callback = (pixel) => {
        return (pixel.icebox && pixel.id !== item.pixelId);
      };
      updateOrder(true, callback);
    }

    if (props.pixelState === 'Unstarted') {
      const callback = (pixel) => {
        return (!pixel.icebox && pixel.state === 'Unstarted' && pixel.id !== item.pixelId);
      };
      updateOrder(false, callback);
    }

    if (props.pixelState !== 'Accepted') {
      const callback = (pixel) => {
        return (pixel.state !== 'Unstarted' && pixel.state !== 'Accepted' && pixel.id !== item.pixelId);
      };
      updateOrder(false, callback);
    }

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
