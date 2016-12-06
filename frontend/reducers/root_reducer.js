import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import HeaderReducer from './header_reducer';

export default combineReducers({
  session: SessionReducer,
  headerInfo: HeaderReducer,
});
