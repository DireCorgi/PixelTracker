import React from 'react';

class SplashPage extends React.Component {

  render() {
    let textClass = "splash-page-text";
    if (this.props.headerType === 'login' || this.props.headerType === 'signup') {
      textClass += " fade";
    }
    return (
      <section className="splash-page">
      <img src={ window.splashBackgroundPath } alt="background"/>
      <h2 className={textClass}>Pixel perfect project management</h2>
      </section>
    );
  }
}

export default SplashPage;
