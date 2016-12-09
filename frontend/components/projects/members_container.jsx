import { connect } from 'react-redux';
import { createProjectMember, deleteProjectMember } from '../../actions/project_actions';
import Members from './members';

const mapStateToProps = (state) => {
  return {
    projectList: state.projects.projectList,
    errors: state.projects.errors,
    currentUsername: state.session.currentUser.username,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createProjectMember: (projectMember) => dispatch(createProjectMember(projectMember)),
    deleteProjectMember: (projectMemberId) => dispatch(deleteProjectMember(projectMemberId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Members);
