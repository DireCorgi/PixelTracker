import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import HeaderReducer from './header_reducer';
import ProjectReducer from './project_reducer';

export default combineReducers({
  session: SessionReducer,
  headerInfo: HeaderReducer,
  projects: ProjectReducer,
});
