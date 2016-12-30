import React from 'react';
import { buttonName } from '../../util/pixel_state_util.js';
import {
  Category,
  SummaryComments,
  SummaryTasks,
  StateButton,
  RejectButton,
} from './pixel_summary_helper';


const PixelSummary = (props) => {
  let className = `pixel-list-item-summary ${props.pixel.state}-item`;
  if (props.pixel.icebox) className += ' icebox-pixel';
  if (props.isDragging) className += ' dragging';
  if (props.pixel.category === 'Release') className += ' release-pixel';

  return(
    <section className="pixel-list-item-container">
    <div className={className}>
      <button onClick={props.handleClick}>
        <i className="material-icons">keyboard_arrow_right</i>
      </button>
      <Category
        loading={props.loading}
        category={props.pixel.category}/>
      <figure className="pixel-points">{props.pixel.points}</figure>
      <span><i className="material-icons">chat_bubble_outline</i></span>
      <section className="hidden-pixel-list-details">
        <h1>{props.pixel.title}</h1>
        <div className="pixel-description">
          <h2>DESCRIPTION</h2>
          <p>{props.pixel.description}</p>
        </div>
        <h3>ACTIVITY</h3>
        <SummaryComments comments={props.pixel.comments}/>
        <h3 className="tasks-header">TASKS</h3>
        <SummaryTasks tasks={props.pixel.tasks}/>
        <footer className="group">
          <div className="pixel-description-footer-left">
            Requested By: {props.pixel.requester}
          </div>
          <div className="pixel-description-footer-right">
            Pixel ID: {props.pixel.id}
          </div>
        </footer>
      </section>
      <summary>{props.pixel.title}</summary>
      <StateButton
        pixel={props.pixel}
        name={buttonName(props.pixel.state)}
        handleUpdateState={props.handleUpdateState} />
      <RejectButton
        pixel={props.pixel}
        handleUpdateState={props.handleUpdateState} />
    </div>
    </section>);
};

export default PixelSummary;
