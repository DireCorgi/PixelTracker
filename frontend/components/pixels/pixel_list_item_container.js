import { connect } from 'react-redux';
import PixelListItem from './pixel_list_item';
import {
  updatePixel,
  loadingSinglePixel,
  finishLoadingSinglePixel,
 } from '../../actions/pixel_actions';
import { dragAndDropError } from '../../actions/error_actions';

const mapStateToProps = (state) => {
  return {
    pixelList: state.pixels.pixelList,
    errors: state.pixels.errors,
    loading: state.loading.individualPixelsLoading,
    ords: state.pixels.ords,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const loadingPixelId = ownProps.pixelId;
  return  {
    updatePixel: (pixelId, pixel) => dispatch(updatePixel(pixelId, pixel)),
    startLoading: () => dispatch(loadingSinglePixel(loadingPixelId)),
    finishLoading: () => dispatch(finishLoadingSinglePixel(loadingPixelId)),
    dragError: () => dispatch(dragAndDropError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PixelListItem);
