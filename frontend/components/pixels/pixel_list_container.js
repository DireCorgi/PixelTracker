import { connect } from 'react-redux';
import PixelList from './pixel_list';
import { fetchPixels, updateMaxOrds } from '../../actions/pixel_actions';
import { selectAllPixels } from '../../reducers/selector';


const mapStateToProps = (state) => {
  return {
    pixelList: state.pixels.pixelList,
    errors: state.pixels.errors,
    sidebar: state.sidebar,
    pixels: selectAllPixels(state),
  };
};

const mapDispatchToProps = (dispatch) => {

  return  {
    fetchPixels: (projectId) => dispatch(fetchPixels(projectId)),
    updateMaxOrds: (maxIcebox, maxBacklog, maxDone, maxUnstarted) => dispatch(updateMaxOrds(maxIcebox, maxBacklog, maxDone, maxUnstarted)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PixelList);
