import { connect } from 'react-redux';
import PixelListDropArea from './pixel_list_drop_area';
import {
  massUpdatePixels,
  updateMassPixels,
 } from '../../actions/pixel_actions';
import { selectAllPixels } from '../../reducers/selector';

const mapStateToProps = (state) => {
  return {
    errors: state.pixels.errors,
    ords: state.pixels.ords,
    allPixels: selectAllPixels(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return  {
    massUpdatePixel: (pixels) => dispatch(massUpdatePixels(pixels)),
    updateMassPixels: (pixels) => dispatch(updateMassPixels(pixels)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PixelListDropArea);
