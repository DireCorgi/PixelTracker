import React from 'react';
import MainHeaderContainer from './headers/main_header_container';
import SplashPage from './splash_page.jsx';

const App = ({ children, location }) => {

  const mainContent = () => {
    if (location.pathname === '/') {
      return (<SplashPage/>);
    } else {
      return null;
    }
  };

  return (
    <main className='main-container'>
      <MainHeaderContainer />
      { mainContent() }
      { children }
    </main>
  );
};

export default App;
