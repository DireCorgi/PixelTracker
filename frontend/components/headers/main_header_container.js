import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import MainHeader from './main_header.jsx';

const mapStateToProps = ( store ) => {
  return { currentUser: store.session.currentUser };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return { logout: () => dispatch(logout()) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainHeader);
