import { connect } from 'react-redux';
import {
        createProjectMember,
        deleteProjectMember,
        resetProjectErrors,
      } from '../../actions/project_actions';
import Members from './members';

const mapStateToProps = (state) => {
  return {
    projectList: state.projects.projectList,
    errors: state.projects.errors,
    currentUsername: state.session.currentUser.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProjectMember: (projectMember) => dispatch(createProjectMember(projectMember)),
    deleteProjectMember: (projectMemberId) => dispatch(deleteProjectMember(projectMemberId)),
    resetProjectErrors: () => dispatch(resetProjectErrors()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Members);
