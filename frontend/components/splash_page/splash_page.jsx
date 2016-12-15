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

        <footer className="splash-page-footer group">
          <h1 className="header-logo splash-footer-logo">
            <img src={window.lightLogoPath} alt="Logo" />
            PixelTracker
          </h1>
          <a href="https://github.com/DireCorgi/pixelTracker">Github</a>
        </footer>
      </section>
    );
  }
}

export default SplashPage;
