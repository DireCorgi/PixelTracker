import { connect } from 'react-redux';
import Tasks from './tasks';
import {
  createTask,
  receiveTasks,
} from '../../actions/pixel_actions';

const mapStateToProps = (state) => {
  return {
    pixelList: state.pixels.pixelList,
    errors: state.pixels.errors,
    loading: state.loading.tasksLoading,
  };
};

const mapDispatchToProps = (dispatch) => {

  return  {
    createTask: (task) => dispatch(createTask(task)),
    receiveTasks: (tasks) => dispatch(receiveTasks(tasks)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
