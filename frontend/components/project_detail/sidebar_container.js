import { connect } from 'react-redux';
import Sidebar from './sidebar';

const mapStateToProps = (state) => {
  return {
    projectList: state.projects.projectList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return  {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
