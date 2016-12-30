import React from 'react';
import { Spinner2 } from '../spinners/spinners';
import ConfirmModal from './confirm_modal';
import CommentList from './comments_list';

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
    e.currentTarget.disabled = true;
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

  render() {
    let className = "";
    if (this.props.errors.body) {
      className = "errored-item";
    }

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
        <CommentList
        comments={this.props.pixelList[this.props.pixelId].comments}
        handleDelete={this.handleDelete} />
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
