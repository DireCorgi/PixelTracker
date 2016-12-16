import React from 'react';

class SplashPage extends React.Component {

  render() {
    let textClass = "splash-page-text";
    let imgClass = "";
    if (this.props.headerType === 'login' || this.props.headerType === 'signup') {
      textClass += " fade";
      imgClass += "blur";
    }
    return (
      <section className="splash-page">
        <img src={ window.splashBackgroundPath } alt="background" className={imgClass}/>
        <h2 className={textClass}>Pixel perfect project management</h2>

        <footer className="splash-page-footer">
          <div className="splash-footer-container group">
            <h1 className="header-logo splash-footer-logo">
              Made by Frank Ye
            </h1>
            <a href="https://github.com/DireCorgi/pixelTracker">Github</a>
          </div>
        </footer>
      </section>
    );
  }
}

export default SplashPage;
