import { connect } from 'react-redux';
import PixelPanel from './pixel_panel';
import { selectAllPixels } from '../../reducers/selector';
import { hideColumn } from '../../actions/sidebar_actions';
import { updatePixel } from '../../actions/pixel_actions';
import { dragAndDropError } from '../../actions/error_actions';

const mapStateToProps = (state) => {
  return {
    pixelList: state.pixels.pixelList,
    errors: state.pixels.errors,
    loading: state.loading.pixelsLoading,
    pixels: selectAllPixels(state),
    sidebar: state.sidebar,
    ords: state.pixels.ords,
  };
};

const mapDispatchToProps = (dispatch) => {
  return  {
    hideColumn: (columnName) => dispatch(hideColumn(columnName)),
    updatePixel: (pixelId, pixel) => dispatch(updatePixel(pixelId, pixel)),
    dragError: () => dispatch(dragAndDropError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PixelPanel);
