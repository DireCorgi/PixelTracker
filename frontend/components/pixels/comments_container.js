import { connect } from 'react-redux';
import Comments from './comments';
import {
  createComment,
  updateComment,
  deleteComment,
} from '../../actions/pixel_actions';

const mapStateToProps = (state) => {
  return {
    pixelList: state.pixels.pixelList,
    errors: state.pixels.errors,
    loading: state.loading.pixelsLoading,
    currentUser: state.session.currentUser.username,
  };
};

const mapDispatchToProps = (dispatch) => {

  return  {
    createComment: (comment) => dispatch(createComment(comment)),
    updateComment: (comment) => dispatch(updateComment(comment)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
