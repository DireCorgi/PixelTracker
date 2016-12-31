import React from 'react';
import CheckBox from './task_list_checkbox';

const TaskForm = (props) => {
  return(
    <section className="new-task-form">
      <CheckBox
        complete={props.complete}
        toggleComplete={props.toggleComplete}
        active={props.id}/>
      <input
        className="new-task-body"
        type="text"
        placeholder="Add a task"
        value={props.body}
        onChange={props.handleChange} />
      <button
        className="cancel-task-button"
        onClick={props.toggleEdit}>Cancel</button>
      <button
        className="add-task-button update-button"
        onClick={props.handleUpdate}>Save</button>
    </section>
  );
};

export default TaskForm;
