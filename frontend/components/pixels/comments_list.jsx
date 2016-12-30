import React from 'react';
import ConfirmModal from './confirm_modal';

const CommentList = (props) => {
  const buttonContent = <i className="material-icons">delete_forever</i>;
  const mapped = props.comments.map((comment, idx) => {
    return (
        <li key={comment.id} className="comment-list-item group">
          <h3>{comment.user}</h3>
          <h4>{comment.created_at}</h4>
          <p>{comment.body}</p>
          <div className="comments-right-nav group">
            <ConfirmModal
              buttonClass=""
              buttonContent={buttonContent}
              message="Do you want to delete this comment?"
              callback={props.handleDelete}
              buttonActive="true"
              buttonValue={idx}/>
          </div>
        </li>
    );
  });
  return (
    <ul className="pixel-comments-list">
      {mapped}
    </ul>
  );
};

export default CommentList;
