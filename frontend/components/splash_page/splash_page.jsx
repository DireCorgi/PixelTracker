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
      </section>
    );
  }
}

export default SplashPage;
