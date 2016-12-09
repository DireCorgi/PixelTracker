import { connect } from 'react-redux';
import { selectAllProjects } from '../../reducers/selector';
import { fetchOneProject } from '../../actions/project_actions';
import { receiveNewHeaderType } from '../../actions/header_actions';
import ProjectDetail from './project_detail';

const mapStateToProps = (state) => {
  return {
    projectsList: state.projects.projectList,
    projectsAll: selectAllProjects(state),
    errors: state.projects.errors,
    loading: state.loading.projectsLoading,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return  {
    fetchProject: (projectId) => dispatch(fetchOneProject(projectId)),
    changeHeader: (headerType) => dispatch(receiveNewHeaderType(headerType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
