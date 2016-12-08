import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Main from './main';
import SessionFormContainer from './sessions/session_form_container';
import Dashboard from './dashboard';

const Root = ({ store }) => {

  function _redirectIfLoggedIn(nextState, replace) {
    if (store.getState().session.currentUser) {
      replace('/');
    }
  }

  function _redirectUnlessLoggedIn(nextState, replace) {
    if (!store.getState().session.currentUser) {
      replace('/');
    }
  }

  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={Main}>
          <Route path="/login" component={ SessionFormContainer } onEnter={ _redirectIfLoggedIn } />
          <Route path="/signup" component={ SessionFormContainer } onEnter={_redirectIfLoggedIn} />
        </Route>
        <Route path="/dashboard" component={ Dashboard } onEnter={ _redirectUnlessLoggedIn } >
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
