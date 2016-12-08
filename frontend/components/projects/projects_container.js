import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Projects from './dashboard_header.jsx';

const mapStateToProps = ( store ) => {
  return {
    currentUser: store.session.currentUser,
    headerType: store.headerInfo.headerType,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);
