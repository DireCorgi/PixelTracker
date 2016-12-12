import { connect } from 'react-redux';
import { createProject, resetProjectErrors } from '../../actions/project_actions';
import ProjectForm from './project_form';

const mapStateToProps = ( state ) => {
  return {
    errors: state.projects.errors,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createProject: (project) => dispatch(createProject(project)),
    resetProjectErrors: () => dispatch(resetProjectErrors()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectForm);
