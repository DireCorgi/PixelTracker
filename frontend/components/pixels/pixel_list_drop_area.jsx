import React from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../../modules/dnd_item_types';

const pixelTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    if (item.pixelId === props.pixelId) {
      return;
    }

    if (props.icebox) {
      const iceboxPixels = [];
      let index = 1;
      props.allPixels.forEach((pixel) => {
        if (pixel.icebox && pixel.id !== item.pixelId) {
          if (pixel.id === props.pixelId) {
            const currentPixel = {};
            currentPixel.id = item.pixelId;
            currentPixel.icebox = true;
            currentPixel.pixel_ord = index;
            index += 1;
            iceboxPixels.push(currentPixel);
          }
          const newPixel = {};
          newPixel.id = pixel.id;
          newPixel.icebox = true;
          newPixel.pixel_ord = index;
          index += 1;
          iceboxPixels.push(newPixel);
        }
      });
      props.updateMassPixels(iceboxPixels);
      const newPixels = {};
      iceboxPixels.forEach((pixel) => {
        newPixels[pixel.id] = { icebox: true, pixel_ord: pixel.pixel_ord };
      });
      props.massUpdatePixel(newPixels);
      return;
    }

    if (props.pixelState === 'Unstarted') {
      const unstartedPixels = [];
      let index = 1;
      props.allPixels.forEach((pixel) => {
        if (!pixel.icebox && pixel.state === 'Unstarted' && pixel.id !== item.pixelId) {
          if (pixel.id === props.pixelId) {
            const currentPixel = {};
            currentPixel.id = item.pixelId;
            currentPixel.icebox = false;
            currentPixel.pixel_ord = index;
            index += 1;
            unstartedPixels.push(currentPixel);
          }
          const newPixel = {};
          newPixel.id = pixel.id;
          newPixel.icebox = false;
          newPixel.pixel_ord = index;
          index += 1;
          unstartedPixels.push(newPixel);
        }
      });
      props.updateMassPixels(unstartedPixels);
      const newPixels = {};
      unstartedPixels.forEach((pixel) => {
        newPixels[pixel.id] = { icebox: false, pixel_ord: pixel.pixel_ord };
      });
      props.massUpdatePixel(newPixels);
      return;
    }

    if (props.pixelState !== 'Accepted') {
      const unstartedPixels = [];
      let index = 1;
      props.allPixels.forEach((pixel) => {
        if (pixel.state !== 'Unstarted' && pixel.state !== 'Accepted' && pixel.id !== item.pixelId) {
          if (pixel.id === props.pixelId) {
            const currentPixel = {};
            currentPixel.id = item.pixelId;
            currentPixel.icebox = false;
            currentPixel.pixel_ord = index;
            index += 1;
            unstartedPixels.push(currentPixel);
          }
          const newPixel = {};
          newPixel.id = pixel.id;
          newPixel.icebox = false;
          newPixel.pixel_ord = index;
          index += 1;
          unstartedPixels.push(newPixel);
        }
      });
      props.updateMassPixels(unstartedPixels);
      const newPixels = {};
      unstartedPixels.forEach((pixel) => {
        newPixels[pixel.id] = { icebox: false, pixel_ord: pixel.pixel_ord };
      });
      props.massUpdatePixel(newPixels);
      return;
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
