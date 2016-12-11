import { connect } from 'react-redux';
import PixelPanel from './pixel_panel';
import { selectAllPixels } from '../../reducers/selector';

const mapStateToProps = (state) => {
  return {
    pixelList: state.pixels.pixelList,
    errors: state.pixels.errors,
    loading: state.loading.pixelsLoading,
    pixels: selectAllPixels(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return  {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PixelPanel);
