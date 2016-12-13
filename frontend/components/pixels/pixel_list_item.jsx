import React from 'react';
import PixelFormContainer from './pixel_form_container';

class PixelListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { opened: false };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (this.state.opened) {
      this.setState({ opened: false });
    } else {
      this.setState({ opened: true });
    }
  }

  renderCategory(category) {
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


  renderComments(pixel) {
    const comments = pixel.comments;
    const mapComments = comments.map((comment, idx) => {
      return (
          <li key={comment.id} className="comment-list-item inside-description">
            <h3>{comment.user}</h3>
            <h4>{comment.created_at}</h4>
            <p>{comment.body}</p>
          </li>
      );
    });
    return mapComments;
  }


  renderSummary(pixel) {
    return(
      <section className="pixel-list-item-container">
      <div className="pixel-list-item-summary">
        <button onClick={this.handleClick}>
          <i className="material-icons">keyboard_arrow_right</i>
        </button>
        {this.renderCategory(pixel.category)}
        <figure className="pixel-points">{pixel.points}</figure>
        <span><i className="material-icons">chat_bubble_outline</i></span>
        <section className="hidden-pixel-list-details">
            <h1>{pixel.title}</h1>
            <div className="pixel-description">
              <h2>DESCRIPTION</h2>
              <p>{pixel.description}</p>
            </div>
            <h3>ACTIVITY</h3>
            <ul className="pixel-comments-list description-ul">
              {this.renderComments(pixel)}
            </ul>
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
      </section>);
  }

  render() {
    const pixel = this.props.pixelList[this.props.pixelId];
    let display = this.renderSummary(pixel);
    if(this.state.opened) {
      display = (
        <PixelFormContainer
          formType="update"
          pixel={pixel}
          handleClick={this.handleClick} />);
    }
    return(
      <div>
        {display}
      </div>
    );
  }
}

export default PixelListItem;
