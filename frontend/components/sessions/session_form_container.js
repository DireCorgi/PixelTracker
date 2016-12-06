import { connect } from 'react-redux';
import SessionForm from './session_form';
import { login, signup } from '../../actions/session_actions';

const mapStateToProps = function (state) {
  return {
    loggedIn: (state.session.currentUser !== null),
    errors: state.session.errors,
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  const formType = ownProps.location.pathname.slice(1);
  let actionFunction = null;
  if (formType === 'login') {
    actionFunction = login;
  } else if (formType === 'signup') {
    actionFunction = signup;
  }
  return {
    processForm: (user) => dispatch(actionFunction(user)),
    formType
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
