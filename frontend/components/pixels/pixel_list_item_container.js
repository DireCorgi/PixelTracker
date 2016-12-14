import { connect } from 'react-redux';
import PixelListItem from './pixel_list_item';
import { updatePixel } from '../../actions/pixel_actions';

const mapStateToProps = (state) => {
  return {
    pixelList: state.pixels.pixelList,
    errors: state.pixels.errors,
    loading: state.loading.pixelsLoading,
    ords: state.pixels.ords,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return  {
    updatePixel: (pixelId, pixel) => dispatch(updatePixel(pixelId, pixel)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PixelListItem);
