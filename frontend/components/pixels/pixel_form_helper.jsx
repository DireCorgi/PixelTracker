import React from 'react';

export const StateButton = (props) => {
  if (props.name === 'none' || props.id === "") {
    return null;
  }
  const className = `next-state-button drop-down-button ${props.name}-button`;
  return (
    <button className={className} onClick={props.handleNextState()}>
      {props.name}
    </button>
  );
};

export const OpenButton = (props) => {
  if (props.id === '') {
    return null;
  }
  return (
    <button onClick={props.handleClick}>
      <i className="material-icons">keyboard_arrow_down</i>
    </button>
  );
};

export const LoadingSpinner = (props) => {
  if (props.id !== "" && props.loading[props.id]) {
    return <props.spinner />;
  }
  if (props.id === "" && props.loading['new']){
    return <props.spinner />;
  }
  return null;
};

export const RejectButton = (props) => {
  if (props.state === 'Delivered'){
    return (
      <button
      className="next-state-button drop-down-button Reject-button"
      onClick={props.handleNextState('Rejected')}>Reject
      </button>
    );
  }
  return null;
};

export const Comments = (props) => {
  if (props.id === "") {
    return null;
  }
  return (
    <props.CommentsContainer pixelId={props.id}/>
  );
};
