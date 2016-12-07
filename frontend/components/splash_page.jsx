import React from 'react';

const SplashPage = (props) => {
  return (
    <section className="splash-page">
      <img src={ window.splashBackgroundPath } alt="background"/>
      <h2 className="splash-page-text">Pixel perfect project management</h2>
    </section>
  );
};

export default SplashPage;
