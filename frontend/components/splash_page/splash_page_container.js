import { connect } from 'react-redux';
import SplashPage from './splash_page';

const mapStateToProps = ( state ) => {
  return {
    headerType: state.headerInfo.headerType,
    user: state.session.currentUser,
   };
};

export default connect(
  mapStateToProps
)(SplashPage);
