import React from 'react';
import MainHeaderContainer from './headers/main_header_container';

const App = ({ children, location }) => {
  return (
    <main className='main-container'>
      <MainHeaderContainer pageLocation={ location.pathname.slice(1) } />
      { children }
    </main>
  );
};

export default App;
