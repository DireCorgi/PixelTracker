import React from 'react';
import { Link } from 'react-router';

class SplashPage extends React.Component {

  render() {
    let textClass = "splash-page-text";
    let imgClass = "";
    let buttonClass = "splash-get-started-button";
    if (this.props.headerType === 'login' || this.props.headerType === 'signup') {
      textClass += " fade";
      imgClass += "blur";
      buttonClass += " fade";
    }
    return (
      <section className="splash-page">
        <img src={ window.splashBackgroundPath } alt="background" className={imgClass}/>
        <div className="splash-center-box">
          <h2 className={textClass}>Pixel perfect project management</h2>
          <Link to="/signup" className={buttonClass}>Get Started!</Link>
        </div>
        <footer className="splash-page-footer">
          <div className="splash-footer-container group">
            <h1 className="header-logo splash-footer-logo">
              Made by <a href="http://www.direcorgi.com">Frank Ye</a>
            </h1>
            <a href="https://github.com/DireCorgi/pixelTracker">Github</a>
          </div>
        </footer>
      </section>
    );
  }
}

export default SplashPage;
