import { connect } from 'react-redux';
import { showColumn, hideColumn, resetView }
  from '../../actions/sidebar_actions';
import Sidebar from './sidebar';

const mapStateToProps = (state) => {
  return {
    projectList: state.projects.projectList,
    sidebar: state.sidebar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return  {
    showColumn: (columnName) => dispatch(showColumn(columnName)),
    hideColumn: (columnName) => dispatch(hideColumn(columnName)),
    resetView: () => dispatch(resetView()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
