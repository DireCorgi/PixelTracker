import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import DashboardHeader from './dashboard_header';
import { selectAllProjects } from '../../reducers/selector';
import { clearErrors } from '../../actions/error_actions';

const mapStateToProps = ( state ) => {
  return {
    currentUser: state.session.currentUser,
    headerType: state.headerInfo.headerType,
    projectList: state.projects.projectList,
    projectsAll: selectAllProjects(state),
    dragErrors: state.globalErrors.dragErrors,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => dispatch(logout()),
    clearErrors: () => dispatch(clearErrors()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardHeader);
