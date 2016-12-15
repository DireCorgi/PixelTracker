import { connect } from 'react-redux';
import PixelForm from './pixel_form';
import {
  createPixel,
  updatePixel,
  removePixel,
  resetPixelErrors,
  createTask,
  receiveTasks,
  loadingSinglePixel,
  finishLoadingSinglePixel,
} from '../../actions/pixel_actions';
import { hideColumn } from '../../actions/sidebar_actions';


const mapStateToProps = (state) => {
  return {
    errors: state.pixels.errors,
    loading: state.loading.individualPixelsLoading,
    tasks: state.pixels.tasks,
    recentPixelId: state.pixels.recentPixelId,
    ords: state.pixels.ords,
  };
};

const mapDispatchToProps = (dispatch) => {
  return  {
    createPixel: (projectId, pixel) => dispatch(createPixel(projectId, pixel)),
    updatePixel: (pixelId, pixel) => dispatch(updatePixel(pixelId, pixel)),
    removePixel: (pixelId) => dispatch(removePixel(pixelId)),
    resetPixelErrors: () => dispatch(resetPixelErrors()),
    hideForm:() => dispatch(hideColumn('newPixel')),
    createTask: (task) => dispatch(createTask(task)),
    receiveTasks: (tasks) => dispatch(receiveTasks(tasks)),
    startLoading: (pixelId) => dispatch(loadingSinglePixel(pixelId)),
    finishLoading: (pixelId) => dispatch(finishLoadingSinglePixel(pixelId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PixelForm);
