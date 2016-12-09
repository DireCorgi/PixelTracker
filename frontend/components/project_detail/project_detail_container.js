import { connect } from 'react-redux';
import { selectAllProjects } from '../../reducers/selector';
import { fetchOneProject } from '../../actions/project_actions';
import ProjectDetail from './project_detail';

const mapStateToProps = (state) => {
  return {
    projectsList: state.projects.projectList,
    projectsAll: selectAllProjects(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return  {
    fetchProject: (projectId) => dispatch(fetchOneProject(projectId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
