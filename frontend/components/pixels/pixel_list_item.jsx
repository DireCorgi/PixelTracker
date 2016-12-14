import React from 'react';
import PixelFormContainer from './pixel_form_container';
import { newPixelState, buttonName }
  from '../../util/pixel_state_util.js';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../../modules/dnd_item_types';
import PixelListItemDrop from './pixel_list_drop_area';

const pixelSource = {
  beginDrag(props) {
    return {
      pixelId: props.pixelId,
      pixelOrd: props.pixelList[props.pixelId].pixel_ord,
      icebox: props.pixelList[props.pixelId].icebox,
      pixelState: props.pixelList[props.pixelId].state,
    };
  },
  canDrag(props) {
    return props.pixelList[props.pixelId].state !== 'Accepted';
  }
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
      if (nextState === 'Accepted') {
        newOrd = this.props.ords.maxDone + 1;
      }
      if (nextState === 'Unstarted') {
        newOrd = this.props.ords.maxUnstarted + 1;
      }
      this.props.updatePixel(pixelId, { state: nextState, icebox: false, pixel_ord: newOrd });
    };
  }

  renderCategory(category) {
    if (category === "Feature") {
      return (<figure><i className="material-icons">star_rate</i></figure>);
    }
    if (category === "Bug") {
      return (<figure><i className="material-icons">bug_report</i></figure>);
    }
    if (category === "Chore") {
      return (<figure><i className="material-icons">build</i></figure>);
    }
    if (category === "Release") {
      return (<figure><i className="material-icons">flag</i></figure>);
    }
  }


  renderComments(pixel) {
    const comments = pixel.comments;
    const mapComments = comments.map((comment, idx) => {
      return (
          <li key={comment.id} className="comment-list-item inside-description">
            <h3>{comment.user}</h3>
            <h4>{comment.created_at}</h4>
            <p>{comment.body}</p>
          </li>
      );
    });
    return mapComments;
  }

  renderTasks(pixel) {
    const tasks = pixel.tasks;
    const mapTasks = tasks.map((task, idx) => {
      let taskClass = "";
      if (task.complete)
        taskClass = "task-complete";
      return (
          <li key={task.id} className="comment-list-item inside-description ordered">
            <p className={taskClass}>{idx + 1}. {task.body}</p>
          </li>
      );
    });
    return mapTasks;
  }

  renderButton(pixel) {
    const name = buttonName(pixel.state);
    if (name === 'none') {
      return null;
    }
    const className = `next-state-button ${name}-button`;
    return (
      <button onClick={this.handleUpdateState(pixel)} className={className}>
        {name}
      </button>
    );
  }


  renderSummary(pixel) {
    let rejectButton = null;
    if (pixel.state === 'Delivered') {
      rejectButton = (
        <button
          className="next-state-button Reject-button"
          onClick={this.handleUpdateState(pixel, 'Rejected')}>Reject</button>
      );
    }



    let className = `pixel-list-item-summary ${pixel.state}-item`;
    if (pixel.icebox) {
      className += ' icebox-pixel';
    }
    if (this.props.isDragging) {
      className += ' dragging';
    }
    if (pixel.category === 'Release')  {
      className += ' release-pixel';
    }

    return(
      <section className="pixel-list-item-container">
      <div className={className}>
        <button onClick={this.handleClick}>
          <i className="material-icons">keyboard_arrow_right</i>
        </button>
        {this.renderCategory(pixel.category)}
        <figure className="pixel-points">{pixel.points}</figure>
        <span><i className="material-icons">chat_bubble_outline</i></span>
        <section className="hidden-pixel-list-details">
            <h1>{pixel.title}</h1>
            <div className="pixel-description">
              <h2>DESCRIPTION</h2>
              <p>{pixel.description}</p>
            </div>
            <h3>ACTIVITY</h3>
            <ul className="pixel-comments-list description-ul">
              {this.renderComments(pixel)}
            </ul>
            <h3 className="tasks-header">TASKS</h3>
            <ol className="pixel-comments-list description-ol">
              {this.renderTasks(pixel)}
            </ol>
          <footer className="group">
            <div className="pixel-description-footer-left">
              Requested By: {pixel.requester}
            </div>

            <div className="pixel-description-footer-right">
              Pixel ID: {pixel.id}
            </div>
          </footer>
        </section>
        <summary>{pixel.title}</summary>
        {this.renderButton(pixel)}
        {rejectButton}
      </div>
      </section>);
  }

  render() {
    const pixel = this.props.pixelList[this.props.pixelId];
    const display = this.renderSummary(pixel);
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
          <PixelListItemDrop icebox={pixel.icebox} pixelState={pixel.state}>
            {display}
          </PixelListItemDrop>
        </div>
      );
    }
    return connectDragSource(
      <div>
        {display}
      </div>
    );
  }
}

export default DragSource(ItemTypes.PIXEL, pixelSource, collect)(PixelListItem);
