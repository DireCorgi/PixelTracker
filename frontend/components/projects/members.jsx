import React from 'react';
import Modal from 'react-modal';

class Members extends React.Component {
  constructor(props) {
    super(props);

    this.state = { formOpen: false, projectMember: { username: "" } };

    this.closeForm = this.closeForm.bind(this);
    this.openForm = this.openForm.bind(this);
  }

  closeForm(e) {
    e.preventDefault();
    this.setState({ formOpen: false });
  }

  openForm() {
    this.setState({ formOpen: true });
  }

  handleNameInput(e) {
    const newName = e.currentTarget.value;
    this.setState({projectMember: { username: newName } });
  }


  handleSubmit(e){
    e.preventDefault();
    // this.props.createProject(this.state.project);
    this.setState({ projectMember: { username: "" } });
  }

  render() {

    return (
      <button onClick={this.openForm}>
        <Modal
        isOpen={this.state.formOpen}
        onRequestClose={this.closeForm}
        style={this.formStyling()}
        contentLabel="manage-members">
          <section className="project-form">
            <form className="project-form-input">
              <label>Add a Member
                <input type="text"
                  placeholder="Enter a username to add to the project"
                  value={this.state.projectMember.username}
                  onChange={this.handleNameInput}
                />
              </label>
            </form>
            <footer className="project-form-footer group">
              <button className="create-project" onClick={this.handleSubmit}>Add Member</button>
              <button onClick={this.closeForm}>Close</button>
            </footer>
          </section>
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
        top: '10%',
        left: '10%',
        right: '10%',
        bottom: '10%',
        padding: '0',
        border: '0',
        borderRadius: '3px',
        background: '#F6F6F6',
        zIndex: 11,
        boxShadow: '1px 1px 4px #333',
        overflow: 'hidden',
      },
    };
  }

}


export default Members;
