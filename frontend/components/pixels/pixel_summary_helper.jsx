import React from 'react';
import { Spinner5 } from '../spinners/spinners';

export const Category = (props) => {
  if (props.loading) {
    return (<Spinner5 />);
  }
  if (props.category === "Feature") {
    return (<figure><i className="material-icons feature-icon">star_rate</i></figure>);
  }
  if (props.category === "Bug") {
    return (<figure><i className="material-icons bug-icon">bug_report</i></figure>);
  }
  if (props.category === "Chore") {
    return (<figure><i className="material-icons chore-icon">build</i></figure>);
  }
  if (props.category === "Release") {
    return (<figure><i className="material-icons release-icon">flag</i></figure>);
  }
};

export const SummaryComments = (props) => {
  const mapComments = props.comments.map((comment, idx) => {
    return (
        <li key={comment.id} className="comment-list-item inside-description">
          <h3>{comment.user}</h3>
          <h4>{comment.created_at}</h4>
          <p>{comment.body}</p>
        </li>
    );
  });
  return (
    <ul className="pixel-comments-list description-ul">
      {mapComments}
    </ul>
  );
};

export const SummaryTasks = (props) => {
  const mapTasks = props.tasks.map((task, idx) => {
    let taskClass = "";
    if (task.complete) taskClass = "task-complete";
    return (
      <li key={task.id} className="comment-list-item inside-description ordered">
        <p className={taskClass}>{idx + 1}. {task.body}</p>
      </li>
    );
  });
  return(
    <ol className="pixel-comments-list description-ol">
      {mapTasks}
    </ol>
  );
};

export const StateButton = (props) => {
  if (props.name === 'none') {
    return null;
  }
  const className = `next-state-button ${props.name}-button`;
  return (
    <button onClick={props.handleUpdateState(props.pixel)} className={className}>
      {props.name}
    </button>
  );
};

export const RejectButton = (props) => {
  if (props.pixel.state === 'Delivered') {
    return (
      <button
        className="next-state-button Reject-button"
        onClick={props.handleUpdateState(props.pixel, 'Rejected')}>Reject</button>
    );
  }
  return null;
};
