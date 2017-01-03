import React from 'react';
import Modal from 'react-modal';

class ProjectForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { formOpen: false, project: { name: "", private: true } };

    this.closeForm = this.closeForm.bind(this);
    this.openForm = this.openForm.bind(this);
    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  closeForm(e) {
    e.preventDefault();
    this.setState({ formOpen: false });
    this.props.resetProjectErrors();
  }

  openForm() {
    this.setState({ formOpen: true });
  }

  handleNameInput(e) {
    const newName = e.currentTarget.value;
    const privacy = this.state.project.private;
    this.setState({project: { name: newName, private: privacy } });
  }

  handleRadio(e) {
    const curName = this.state.project.name;
    let privacy = true;
    if (e.currentTarget.value === "false") {
      privacy = false;
    }
    this.setState({project: { name: curName, private: privacy } });
  }

  handleSubmit(e){
    this.props.createProject(this.state.project).then(() => {
      this.setState({ project: { name: "", private: true } });
      this.closeForm(e);
    });
  }

  render() {
    let projectName = "Project Name";
    if (this.props.errors[0] === "Name can't be blank") {
      projectName = <strong>Project Name: Can't Be Blank</strong>;
    }
    return (
      <button id="project-button" onClick={this.openForm}>Create Project
        <Modal
        isOpen={this.state.formOpen}
        onRequestClose={this.closeForm}
        style={this.formStyling()}
        contentLabel="create-project">
          <section className="project-form">
            <h1>Create a new project</h1>
            <form className="project-form-input">
              <label>{projectName}
                <input type="text"
                  placeholder="Enter a name for your project"
                  value={this.state.project.name}
                  onChange={this.handleNameInput}
                />
              </label>

              <div className="privacy-options">
                <label>Project privacy
                  <div className="radio-set group">
                    <input type="radio" value="true"
                      onChange={this.handleRadio}
                      checked={this.state.project.private}/>
                    <label>Private</label>
                    <p>Only members can view and edit the project</p>
                  </div>
                  <div className="radio-set group">
                    <input type="radio" value="false"
                      onChange={this.handleRadio}
                      checked={!this.state.project.private}/>
                    <label>Public</label>
                    <p>Anyone can view the project. Only members can edit.</p>
                  </div>
                </label>
              </div>

            </form>
            <footer className="project-form-footer group">
              <button className="create-project" onClick={this.handleSubmit}>Create</button>
              <button onClick={this.closeForm}>Cancel</button>
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
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '0',
        border: '0',
        borderRadius: '3px',
        background: '#F6F6F6',
        zIndex: 11,
        width: '480px',
        height: '429px',
        boxShadow: '1px 1px 4px #333',
        overflow: 'hidden',
      },
    };
  }

}


export default ProjectForm;
