import { connect } from 'react-redux';
import PixelList from './pixel_list';
import { fetchPixels } from '../../actions/pixel_actions';


const mapStateToProps = (state) => {
  return {
    pixelList: state.pixels.pixelList,
    errors: state.pixels.errors,
    sidebar: state.sidebar,
  };
};

const mapDispatchToProps = (dispatch) => {

  return  {
    fetchPixels: (projectId) => dispatch(fetchPixels(projectId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PixelList);
