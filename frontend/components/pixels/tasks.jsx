import React from 'react';
import TaskListItem from './task_list_item';
import { Spinner3 } from '../spinners/spinners';

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.maxOrd = 0;
    if (this.props.pixelId === "") {
      this.state = {
        body: "",
        tasksComplete: 0,
        totalTasks: 0,
        loading: false,
        tasks: [],
      };
    } else {
      this.state = {
        body: "" ,
        tasksComplete: this.getCompletedTasks(),
        totalTasks: this.taskList().length,
        loading: false,
      };
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateComplete = this.updateComplete.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }

  componentWillUnmount() {
    if(this.props.pixelId === "")
      this.props.receiveTasks([]);
  }

  getCompletedTasks() {
    let completeTasks = 0;
    this.taskList().forEach((task) => {
      if (task.complete)
        completeTasks += 1;
    });
    return completeTasks;
  }

  updateTask(idx, body) {
    const newTask = Object.assign({}, this.state.tasks[idx]);
    let newBody = body;
    if (newBody === "") {
      newBody = "[blank]";
    }
    newTask.body = newBody;
    const newTasks = [...this.state.tasks];
    newTasks[idx] = newTask;
    this.setState({ tasks: newTasks });
    this.props.receiveTasks(newTasks);
  }

  updateComplete(num) {
    let completedTasks = this.state.tasksComplete;
    completedTasks += num;
    this.setState({ tasksComplete: completedTasks });
  }

  removeTask(idx) {
    const newTasks = this.state.totalTasks - 1;
    if (this.props.pixelId === "") {
      const newTaskList = [...this.state.tasks];
      newTaskList.splice(idx, 1);
      this.setState({ totalTasks: newTasks, tasks: newTaskList });
      this.props.receiveTasks(newTaskList);
    } else {
      this.setState({ totalTasks: newTasks });
    }
  }

  taskList() {
    if (this.props.pixelId === "") {
      return this.state.tasks;
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
      this.setState({ loading: true });
      const newTask = {
        body: this.state.body,
        pixel_id: this.props.pixelId,
        task_ord: (this.maxOrd + 1),
       };
      this.props.createTask(newTask).then(() => {
        this.setState({ body: "", totalTasks: (this.state.totalTasks + 1), loading: false });
        this.maxOrd += 1;
        target.disabled = false;
      });
    } else {
      let body = this.state.body;
      if (body === "") {
        body = "[blank]";
      }
      const newTask = {
        body: body,
        task_ord: (this.maxOrd + 1),
        complete: false,
       };
      const newTasks = [...this.state.tasks];
      newTasks.push(newTask);
      this.maxOrd += 1;
      target.disabled = false;
      this.setState({
        body: "",
        totalTasks: (this.state.totalTasks + 1),
        loading: false,
        tasks: newTasks,
      });
      this.props.receiveTasks(newTasks);
    }
  }

  handleChange(e) {
    const newBody = e.currentTarget.value;
    this.setState({ body: newBody });
  }

  renderTaskList() {
    const taskListItems = this.taskList().map((task, idx) => {
      return(
        <TaskListItem
          key={`${idx}-{task.body}`}
          task={task}
          updateComplete={this.updateComplete}
          removeTask={this.removeTask}
          taskIndex={idx}
          updateNewTask={this.updateTask}/>);
    });

    return (
      <ul className="task-list">
        {taskListItems}
      </ul>
    );
  }

  renderForm() {
    if (this.state.loading) {
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
