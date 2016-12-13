import React from 'react';
import { Spinner2 } from '../spinners/spinners';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { body: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const newBody = e.currentTarget.value;
    this.setState({ body: newBody });
  }

  handleDelete(e) {
    e.preventDefault();
    const idx = parseInt(e.currentTarget.value);
    const comment = this.props.pixelList[this.props.pixelId].comments[idx];
    if (comment.user === this.props.currentUser) {
      this.props.deleteComment(comment.id);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const newComment = this.state;
    newComment.pixel_id = this.props.pixelId;
    this.props.createComment(newComment).then(
      () => {
        this.setState({ body: "" });
      }
    );
  }

  renderComments() {
    const comments = this.props.pixelList[this.props.pixelId].comments;
    const mapComments = comments.map((comment, idx) => {
      return (
          <li key={comment.id} className="comment-list-item group">
            <h3>{comment.user}</h3>
            <h4>{comment.created_at}</h4>
            <p>{comment.body}</p>
            <div className="comments-right-nav group">
              <button onClick={this.handleDelete} value={idx}><i
                className="material-icons">delete_forever</i>
              </button>
            </div>
          </li>
      );
    });
    return mapComments;
  }


  render() {
    let className = "";
    if (this.props.errors.body) {
      className = "errored-item";
    }
    debugger

    if (this.props.loading) {
      return (
        <section className="pixel-comments-container">
          <Spinner2 />
        </section>
      );
    }
    return (
      <section className="pixel-comments-container">
        <h2>Activity</h2>
        <ul className="pixel-comments-list">
          {this.renderComments()}
        </ul>
        <section className="new-comment group">
          <textarea
            className={className}
            value={this.state.body}
            onChange={this.handleChange}
            placeholder="Add a comment" />
          <button onClick={this.handleSubmit}>Add</button>
        </section>
      </section>
    );
  }
}

export default Comments;
