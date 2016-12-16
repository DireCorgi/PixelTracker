import React from 'react';
import Modal from 'react-modal';

//buttonClass, buttonContent, message, callback, buttonActive: required props

class ConfirmModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { confirmOpen: false };

    this.closeForm = this.closeForm.bind(this);
    this.openForm = this.openForm.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  closeForm() {
    this.setState({ confirmOpen: false });
  }

  openForm() {
    if(this.props.buttonActive)
      this.setState({ confirmOpen: true });
  }

  handleClick(e) {
    if(this.props.buttonActive) {
      e.preventDefault();
      this.props.callback(e);
      this.closeForm();
    }
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
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '0',
        border: '0',
        borderRadius: '3px',
        background: '#F6F6F6',
        zIndex: 11,
        width: '260px',
        height: '160px',
        boxShadow: '1px 1px 4px #333',
        overflow: 'hidden',
      },
    };
  }

  render() {
    return (
      <button className={this.props.buttonClass} onClick={this.openForm}>
        {this.props.buttonContent}
        <Modal
        isOpen={this.state.confirmOpen}
        onRequestClose={this.closeForm}
        style={this.formStyling()}>
          <h4 className="confirm-modal-message">{this.props.message}</h4>
          <div className="confirm-modal-buttons group">
            <button
              onClick={this.handleClick}
              className="confirm-modal-confirm-button">Confirm</button>
            <button
              onClick={this.closeForm}
              className="confirm-modal-cancel-button">Cancel</button>
          </div>
        </Modal>
      </button>
    );
  }
}

export default ConfirmModal;
