import React from 'react';

class PixelPanel extends React.Component {
  pixelSummary() {
    return (
      <ul>
        
      </ul>
    );
  }

  render() {
    return(
      <main className="panel-container">
        <header className="panel-header">{ this.props.panelName }</header>
        <section className="panel-list">

        </section>
      </main>
    );
  }
}

export default PixelPanel;
