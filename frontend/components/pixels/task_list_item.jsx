import React from 'react';
import { connect } from 'react-redux';
import { updateTask, deleteTask } from '../../actions/pixel_actions';

class TaskListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: this.props.task.body,
      task_ord: this.props.task.task_ord,
      complete: this.props.task.complete,
      editMode: false,
    };
  }

  render() {
    let complete = "done";
    if (!this.state.complete) {
      complete = "not done";
    }
    return (
      <li>{this.state.body}{this.state.task_ord}{complete}</li>
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
