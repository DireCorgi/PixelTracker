import React from 'react';

class PixelPanel extends React.Component {
  pixelSummary() {
    const mapPixels = [];
    this.props.pixels.forEach((pixel)=> {
      if (this.props.panelName === 'Icebox'){
        if (pixel.icebox)
          mapPixels.push(<li key={pixel.id}>{pixel.title}</li>);
      } else if (this.props.panelName === 'Current/Backlog') {
        if (!pixel.icebox && pixel.state !== 'Accepted')
          mapPixels.push(<li key={pixel.id}>{pixel.title}</li>);
      } else if (this.props.panelName === 'Done') {
        if (pixel.state === 'Accepted')
          mapPixels.push(<li key={pixel.id}>{pixel.title}</li>);
      }
    });

    return (
      <ul>
        {mapPixels}
      </ul>
    );
  }

  render() {
    return(
      <article className="panel-container">
        <div className="left-panel-divider"></div>
        <header className="panel-header">
          <button></button>
          { this.props.panelName }
        </header>
        <section className="panel-list">
          {this.pixelSummary()}
        </section>
      </article>
    );
  }
}

export default PixelPanel;
