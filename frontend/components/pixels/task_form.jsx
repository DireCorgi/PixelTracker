import React from 'react';
import { Spinner3 } from '../spinners/spinners';

const TaskForm = (props) => {
  if (props.loading) {
    return (
      <section className="new-task-form">
        <Spinner3 />
      </section>
    );
  }
  return (
    <section className="new-task-form">
      <input className="task-complete" type="checkbox" disabled />
      <input
        className="new-task-body"
        type="text"
        placeholder="Add a task"
        value={props.body}
        onChange={props.handleChange} />
      <button
        className="add-task-button"
        onClick={props.handleSubmit}>Add</button>
    </section>
  );
};

export default TaskForm;
