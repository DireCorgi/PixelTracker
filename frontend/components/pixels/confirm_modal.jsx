import React from 'react';
import Modal from 'react-modal';

class ConfirmModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { confirmOpen: false };

    this.closeForm = this.closeForm.bind(this);
    this.openForm = this.openForm.bind(this);
  }

  closeForm(e) {
    this.setState({ confirmOpen: false });
  }

  openForm() {
    this.setState({ confirmOpen: true });
  }

  render() {
    return (
      <button className={this.props.buttonClass} onClick={this.confirmOpen}>
        {this.props.buttonContent}
        <Modal
        isOpen={this.state.formOpen}
        onRequestClose={this.closeForm}
        style={this.formStyling()}>
          <h4>{this.props.message}</h4>
          <div className="confirm-modal-buttons">
            <button onClick={this.props.callback}>Confirm</button>
            <button onClick={this.closeForm}>Cancel</button>
          </div>
        </Modal>
      </button>
    );
  }
}

export default ConfirmModal;
