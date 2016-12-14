import React from 'react';
import PixelFormContainer from './pixel_form_container';
import { newPixelState, buttonName }
  from '../../util/pixel_state_util.js';

class PixelListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { opened: false };
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

    return(
      <section className="pixel-list-item-container">
      <div className="pixel-list-item-summary">
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
    let display = this.renderSummary(pixel);
    if(this.state.opened) {
      display = (
        <PixelFormContainer
          formType="update"
          pixel={pixel}
          handleClick={this.handleClick} />);
    }
    return(
      <div>
        {display}
      </div>
    );
  }
}

export default PixelListItem;
