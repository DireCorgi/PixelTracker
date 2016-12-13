import React from 'react';
import { connect } from 'react-redux';
import { updateTask, deleteTask } from '../../actions/pixel_actions';
import { Spinner4 } from '../spinners/spinners';

class TaskListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: this.props.task.body,
      task_ord: this.props.task.task_ord,
      complete: this.props.task.complete,
      editMode: false,
      loading: false,
    };

    this.defaultBody = this.props.task.body;
    this.handleChange = this.handleChange.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const newBody = e.currentTarget.value;
    this.setState({ body: newBody });
  }

  handleUpdate(e) {
    e.preventDefault();
    const target = e.currentTarget;
    target.disabled = true;
    if (this.props.task.id) {
      this.setState({ loading: true });
        this.props.updateTask({ body: this.state.body, id: this.props.task.id })
        .then( () => {
          target.disabled = false;
          this.setState({ loading: false, editMode: false });
        }
      );
    } else {
      this.props.updateNewTask(this.props.taskIndex, this.state.body );
      target.disabled = false;
      this.setState({ editMode: false });
    }
  }

  handleDelete(e) {
    e.preventDefault();
    const target = e.currentTarget;
    target.disabled = true;
    this.setState({ loading: true });
    if (this.props.task.id) {
      this.props.deleteTask(this.props.task.id).then(() => {
        this.props.removeTask(-1);
      });
    } else {
      this.props.removeTask(this.props.taskIndex);
    }
  }

  toggleComplete(e) {
    e.preventDefault();
    const target = e.currentTarget;
    target.disabled = true;
    const enable = () => { target.disabled = false; };
    if (this.state.complete === false) {
      this.setState({ complete: true });
      this.props.updateTask({ complete: true, id: this.props.task.id }).then(
        () => {
          enable();
          this.props.updateComplete(1);
        },
        enable
      );
    } else {
      this.setState({ complete: false });
      this.props.updateTask({ complete: false, id: this.props.task.id }).then(
        () => {
          enable();
          this.props.updateComplete(-1);
        },
        enable
      );
    }
  }

  toggleEdit(e) {
    e.preventDefault();
    if (this.state.editMode === false){
      this.defaultBody = this.state.body;
      this.setState({ editMode: true });
    } else {
      this.setState({ body: this.defaultBody });
      this.setState({ editMode: false });
    }
  }

  checkBox() {
    let checkBox = (
      <input
        className="task-complete"
        type="checkbox"
        disabled/>
    );

    if (this.props.task.id) {
      checkBox = (
        <input
          className="task-complete"
          type="checkbox"
          checked={this.state.complete}
          onChange={this.toggleComplete} />
      );
    }

    return checkBox;
  }

  renderForm() {

    return(
      <section className="new-task-form">
        {this.checkBox()}
        <input
          className="new-task-body"
          type="text"
          placeholder="Add a task"
          value={this.state.body}
          onChange={this.handleChange} />
        <button
          className="cancel-task-button"
          onClick={this.toggleEdit}>Cancel</button>
        <button
          className="add-task-button update-button"
          onClick={this.handleUpdate}>Save</button>
      </section>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <section className="new-task-form task-list-item">
          <Spinner4 />
        </section>
      );
    }

    if (this.state.editMode) {
      return this.renderForm();
    }
    let complete = "done";
    if (!this.state.complete) {
      complete = "not done";
    }

    let sectionClassName = "new-task-form task-list-item";
    if (this.state.complete) {
      sectionClassName += " complete-task";
    }
    return (
      <section className={sectionClassName}>
        {this.checkBox()}
        <p>{this.state.body}</p>
        <button
          className="edit-button"
          onClick={this.toggleEdit}>
          <i className="material-icons">mode_edit</i>
        </button>
        <button
          className="edit-button"
          onClick={this.handleDelete}>
          <i className="material-icons">delete</i>
        </button>
      </section>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    errors: state.pixels.errors,
    loading: state.loading.tasksLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return  {
    updateTask: (task) => dispatch(updateTask(task)),
    deleteTask: (taskId) => dispatch(deleteTask(taskId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskListItem);
