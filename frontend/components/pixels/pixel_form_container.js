import { connect } from 'react-redux';
import PixelForm from './pixel_form';
import { createPixel, updatePixel, removePixel }
  from '../../actions/pixel_actions';


const mapStateToProps = (state) => {
  return {
    errors: state.pixels.errors,
    loading: state.loading.pixelsLoading,
  };
};

const mapDispatchToProps = (dispatch) => {

  return  {
    createPixel: (projectId, pixel) => dispatch(createPixel(projectId, pixel)),
    updatePixel: (pixelId, pixel) => dispatch(updatePixel(pixelId, pixel)),
    removePixel: (pixelId) => dispatch(removePixel(pixelId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PixelForm);
