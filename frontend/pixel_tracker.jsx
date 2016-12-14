import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import Modal from 'react-modal';

document.addEventListener('DOMContentLoaded', () => {
  let preloadedState = {};
  if (window.currentUser) {
    preloadedState = { session: { currentUser: window.currentUser } };
  }
  const store = configureStore(preloadedState);
  const root = document.getElementById('root');
  Modal.setAppElement(document.body);
  window.store = store;
  ReactDOM.render(<Root store={ store } />, root);
});
