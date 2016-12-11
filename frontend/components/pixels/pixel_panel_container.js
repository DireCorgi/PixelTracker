import { connect } from 'react-redux';
import PixelPanel from './pixel_panel';
import { selectAllPixels } from '../../reducers/selector';
import { hideColumn } from '../../actions/sidebar_actions';

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
    hideColumn: (columnName) => dispatch(hideColumn(columnName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PixelPanel);
