import { connect } from 'react-redux';
import SplashPage from './splash_page';

const mapStateToProps = ( store ) => {
  return { headerType: store.headerInfo.headerType };
};

export default connect(
  mapStateToProps
)(SplashPage);
