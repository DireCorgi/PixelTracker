import React from 'react';

const CheckBox = (props) => {

  if (props.active) {
    return (
      <input
        className="task-complete"
        type="checkbox"
        checked={props.complete}
        onChange={props.toggleComplete} />
    );
  } else {
    return (
      <input
        className="task-complete"
        type="checkbox"
        disabled/>
    )
  }

}

export default CheckBox
