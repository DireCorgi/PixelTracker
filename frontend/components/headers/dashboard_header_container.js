import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import DashboardHeader from './dashboard_header';
import { selectAllProjects } from '../../reducers/selector';

const mapStateToProps = ( state ) => {
  return {
    currentUser: state.session.currentUser,
    headerType: state.headerInfo.headerType,
    projectList: state.projects.projectList,
    projectsAll: selectAllProjects(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return { logout: () => dispatch(logout()) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardHeader);
