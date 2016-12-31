import React from 'react';
import { RainbowSpinner } from '../spinners/spinners';
import ConfirmModal from '../pixels/confirm_modal';

const MemberList = (props) => {
  if (props.loading) {
    return (
      <figure>
        <RainbowSpinner />
      </figure>
    );
  }
  let members = [];
  if (props.project) members = props.project.members;
  const membersMapped = members.map((member) => {
    if (member.member_name === props.currentUsername){
      return (
        <li key={member.project_member_id}>
          <span>{member.member_name}</span>
          <span className="email">{member.member_email}</span>
        </li>
      );
    }
    return (
      <li key={member.project_member_id}>
        <span>{member.member_name}</span>
        <span className="email">{member.member_email}</span>
        <ConfirmModal
           buttonClass=""
           buttonContent="Remove"
           message={`Are you sure you want to remove ${member.member_name}?`}
           callback={props.handleRemove}
           buttonActive="true"
           buttonValue={member.project_member_id}/>
      </li>
    );
  });
  return (
    <section className="member-list">
      <h2>Current Members</h2>
      {membersMapped}
    </section>
  );
};

export default MemberList;
