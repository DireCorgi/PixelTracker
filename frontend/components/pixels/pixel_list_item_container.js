import { connect } from 'react-redux';
import PixelListItem from './pixel_list_item';


const mapStateToProps = (state) => {
  return {
    pixelList: state.pixels.pixelList,
    errors: state.pixels.errors,
    loading: state.loading.pixelsLoading,
  };
};

const mapDispatchToProps = (dispatch) => {

  return  {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PixelListItem);
