import React from 'react';
import TaskListItem from './task_list_item';
import { Spinner3 } from '../spinners/spinners';

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.maxOrd = 0;
    this.state = { body: "" , tasksComplete: this.getCompletedTasks(), totalTasks: this.taskList().length};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateComplete = this.updateComplete.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }

  getCompletedTasks() {
    let completeTasks = 0;
    this.taskList().forEach((task) => {
      if (task.complete)
        completeTasks += 1;
    });
    return completeTasks;
  }

  updateComplete(num) {
    let completedTasks = this.state.tasksComplete;
    completedTasks += num;
    this.setState({ tasksComplete: completedTasks });
  }

  removeTask() {
    const newTasks = this.state.totalTasks - 1;
    this.setState({ totalTasks: newTasks });
  }

  taskList() {
    if (this.props.pixelId === "") {
      return [];
    } else {
      const pixelList =  this.props.pixelList[this.props.pixelId].tasks;
      const lastElement = pixelList[pixelList.length - 1];
      if (lastElement)
        this.maxOrd = lastElement.task_ord;
      return pixelList;
    }
  }

  handleSubmit(e) {
    const target = e.currentTarget;
    target.disabled = true;
    if (this.props.pixelId !== "") {
      const newTask = {
        body: this.state.body,
        pixel_id: this.props.pixelId,
        task_ord: (this.maxOrd + 1),
       };
      this.props.createTask(newTask).then(() => {
        this.setState({ body: "", totalTasks: (this.state.totalTasks + 1) });
        this.maxOrd += 1;
        target.disabled = false;
      });
    }
  }

  handleChange(e) {
    const newBody = e.currentTarget.value;
    this.setState({ body: newBody });
  }

  renderTaskList() {
    const taskListItems = this.taskList().map((task) => {
      return(
        <TaskListItem
          key={task.id}
          task={task}
          updateComplete={this.updateComplete}
          removeTask={this.removeTask}/>);
    });

    return (
      <ul className="task-list">
        {taskListItems}
      </ul>
    );
  }

  renderForm() {
    if (this.props.loading) {
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
          value={this.state.body}
          onChange={this.handleChange} />
        <button
          className="add-task-button"
          onClick={this.handleSubmit}>Add</button>
      </section>
    );
  }

  render() {
    return (
      <section className="tasks-container">
        <h2>Tasks ({this.state.tasksComplete}/{this.state.totalTasks})</h2>
        {this.renderTaskList()}
        {this.renderForm()}
      </section>
    );
  }
}

export default Tasks;
