import React from 'react';
import PixelFormContainer from './pixel_form_container';
import { newPixelState } from '../../util/pixel_state_util.js';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../../modules/dnd_item_types';
import PixelListItemDropContainer from './pixel_list_drop_area_container';
import PixelSummary from './pixel_summary';

const pixelSource = {
  beginDrag(props, monitor, component) {
    return {
      pixelId: props.pixelId,
      pixelOrd: props.pixelList[props.pixelId].pixel_ord,
      icebox: props.pixelList[props.pixelId].icebox,
      pixelState: props.pixelList[props.pixelId].state,
      startLoading: props.startLoading,
      finishLoading: props.finishLoading,
    };
  },
  canDrag(props) {
    return props.pixelList[props.pixelId].state !== 'Accepted';
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

class PixelListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { opened: false, hover: false };
    this.handleClick = this.handleClick.bind(this);
    this.handleUpdateState = this.handleUpdateState.bind(this);
  }


  handleClick(e) {
    if (this.state.opened) {
      this.setState({ opened: false });
    } else {
      this.setState({ opened: true });
    }
  }

  handleUpdateState(pixel, newState = null) {
    return (e) => {
      const pixelId = pixel.id;
      const curState = pixel.state;
      if (newState === null) {
        newState = newPixelState(curState);
      }
      const nextState = newState;
      let newOrd = pixel.pixel_ord;
      if (pixel.icebox) {
        newOrd = this.props.ords.maxBacklog + 1;
      }
      if (curState === 'Unstarted' && nextState !== 'Unstarted') {
        newOrd = this.props.ords.maxBacklog + 1;
      }
      if (nextState === 'Accepted') {
        newOrd = this.props.ords.maxDone + 1;
      }
      if (nextState === 'Unstarted') {
        newOrd = this.props.ords.maxUnstarted + 1;
      }
      this.props.startLoading();
      this.props.updatePixel(pixelId, { state: nextState, icebox: false, pixel_ord: newOrd })
        .then(
          () => this.props.finishLoading(),
          () => {
            this.props.dragError();
            this.props.finishLoading();
          }
        );
    };
  }

  render() {
    const pixel = this.props.pixelList[this.props.pixelId];
    if(!pixel) return null;
    const { connectDragSource, isDragging } = this.props;
    if(this.state.opened) {
      return (
        <div>
          <PixelFormContainer
          formType="update"
          pixel={pixel}
          handleClick={this.handleClick} />
        </div>
      );
    }
    if (pixel.state !== 'Accepted') {
      return connectDragSource(
        <div>
          <PixelListItemDropContainer
            icebox={pixel.icebox}
            pixelState={pixel.state}
            pixelId={pixel.id}>
            <PixelSummary
              pixel={pixel}
              handleClick={this.handleClick}
              loading={this.props.loading[this.props.pixelId]}
              handleUpdateState={this.handleUpdateState} />
          </PixelListItemDropContainer>
        </div>
      );
    }
    return connectDragSource(
      <div>
        <PixelSummary
          pixel={pixel}
          handleClick={this.handleClick}
          loading={this.props.loading[this.props.pixelId]}
          handleUpdateState={this.handleUpdateState} />
      </div>
    );
  }
}

export default DragSource(ItemTypes.PIXEL, pixelSource, collect)(PixelListItem);
