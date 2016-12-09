import { connect } from 'react-redux';
import { fetchProjects } from '../../actions/project_actions';
import { selectAllProjects } from '../../reducers/selector';
import Projects from './projects';

const mapStateToProps = ( state ) => {
  return {
    projectList: selectAllProjects(state),
    projects: state.projects,
    loading: state.loading.projectsLoading,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchProjects: () => dispatch(fetchProjects()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);
