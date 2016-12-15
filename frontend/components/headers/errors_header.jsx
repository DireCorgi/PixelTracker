import React from 'react';

class ErrorHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {reload: false, ignore: false };
    this.reloadPage = this.reloadPage.bind(this);
  }

  reloadPage(e) {
    this.setState({ reload: true });
    window.location.reload(true);
  }

  render() {
    return(
      <section className="errors-header">
        Something Went Wrong. Your changes were not saved. Please reload the page.
        <button
          className="errors-reload-button"
          onClick={this.reloadPage}
          disabled={this.state.reload}>
          Reload
        </button>
        <button
          className="errors-ignore-button"
          disabled={this.state.ignore}>
          Ignore
        </button>
      </section>
    );
  }
}

export default ErrorHeader;
