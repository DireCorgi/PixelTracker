import React from 'react';

class PixelListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { opened: false };
  }

  renderCategory(category) {
    // (Feature Bug Chore Release)
    if (category === "Feature") {
      return (<figure><i className="material-icons">star_rate</i></figure>);
    }
    if (category === "Bug") {
      return (<figure><i className="material-icons">bug_report</i></figure>);
    }
    if (category === "Chore") {
      return (<figure><i className="material-icons">build</i></figure>);
    }
    if (category === "Release") {
      return (<figure><i className="material-icons">flag</i></figure>);
    }
  }

  render() {
    const pixel = this.props.pixelList[this.props.pixelId];
    return(
      <section className="pixel-list-item-container">
        <div className="pixel-list-item-summary">
          <button><i className="material-icons">keyboard_arrow_right</i></button>
          {this.renderCategory(pixel.category)}
          <figure className="pixel-points">{pixel.points}</figure>
          <span><i className="material-icons">chat_bubble_outline</i></span>
          <section className="hidden-pixel-list-details">
              <h1>{pixel.title}</h1>
              <div className="pixel-description">
                <h2>DESCRIPTION</h2>
                <p>{pixel.description}</p>
              </div>
            <footer className="group">
              <div className="pixel-description-footer-left">
                Requested By: {pixel.requester}
              </div>

              <div className="pixel-description-footer-right">
                Pixel ID: {pixel.id}
              </div>
            </footer>
          </section>
          <summary>{pixel.title}</summary>
        </div>
      </section>
    );
  }
}

export default PixelListItem;
