import { connect } from 'react-redux';
import { updateTask, deleteTask } from '../../actions/pixel_actions';
import TaskListItem from './task_list_item';

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
