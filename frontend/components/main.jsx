import React from 'react';
import MainHeaderContainer from './headers/main_header_container';
import SplashPageContainer from './splash_page/splash_page_container';

const Main = ({ children }) => {
  return (
    <div className='main-container'>
      <MainHeaderContainer />
      <main className='main-content'>
        <SplashPageContainer />
        { children }
      </main>
    </div>
  );
};

export default Main;
