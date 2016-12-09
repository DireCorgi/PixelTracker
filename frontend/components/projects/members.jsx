import React from 'react';
import Modal from 'react-modal';
import { RainbowSpinner } from '../spinners/spinners';

class Members extends React.Component {
  constructor(props) {
    super(props);

    this.state = { formOpen: false, username: "" };

    this.closeForm = this.closeForm.bind(this);
    this.openForm = this.openForm.bind(this);
    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  closeForm(e) {
    e.preventDefault();
    this.props.resetProjectErrors();
    this.setState({ formOpen: false });
  }

  openForm() {
    this.setState({ formOpen: true });
  }

  handleNameInput(e) {
    const newName = e.currentTarget.value;
    this.setState({username: newName });
  }


  handleSubmit(e){
    e.preventDefault();
    const projectMember = {
      username: this.state.username,
      project_id: this.props.projectId,
    };
    this.props.createProjectMember(projectMember);
    this.setState({ username: "" });
  }

  handleRemove(e){
    e.preventDefault();
    this.props.deleteProjectMember(e.currentTarget.value);
  }

  renderMembers(){
    if (this.props.loading) {
      return (
        <figure>
          <RainbowSpinner />
        </figure>
      );
    }
    const members = this.props.projectList[this.props.projectId].members;
    return (
      members.map((member) => {
        if (member.member_name === this.props.currentUsername){
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
            <button value={member.project_member_id} onClick={this.handleRemove}>Remove</button>
          </li>
        );
      })
    );
  }

  render() {

    const errors = this.props.errors.map((error, idx)=>(<li key={idx}>{error}</li>));

    return (
      <button onClick={this.openForm}>
        <Modal
        isOpen={this.state.formOpen}
        onRequestClose={this.closeForm}
        style={this.formStyling()}
        contentLabel="manage-members">
          <div className='members-container'>
            <section className="project-form">
              <h1>Members</h1>
              <section className="member-list">
                <h2>Current Members</h2>
                {this.renderMembers()}
              </section>
              <form className="project-form-input">
                <label>Add a Member
                  <input type="text"
                    placeholder="Enter a username to add to the project"
                    value={this.state.username}
                    onChange={this.handleNameInput}
                  />
                </label>
              </form>
              <footer className="project-form-footer group">
                <button className="create-project" onClick={this.handleSubmit}>Add Member</button>
                <button onClick={this.closeForm}>Close</button>
                <ul className="error-display form-errors">
                {errors}
                </ul>
              </footer>
            </section>
          </div>
        </Modal>
      </button>
    );
  }

  formStyling() {
    return {
      overlay : {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.75)',
        zIndex: 10,
      },
      content : {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '0',
        border: '0',
        borderRadius: '3px',
        background: '#F6F6F6',
        zIndex: 11,
        width: '480px',
        height: '520px',
        boxShadow: '1px 1px 4px #333',
        overflow: 'hidden',
      },
    };
  }

}


export default Members;
