import React from 'react';
import PixelListItemContainer from './pixel_list_item_container';

class PixelPanel extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  pixelSummary() {
    const mapPixels = [];
    this.props.pixels.forEach((pixel)=> {
      if (this.props.panelName === 'Icebox'){
        if (pixel.icebox)
          mapPixels.push(<li key={pixel.id}><PixelListItemContainer pixelId={pixel.id} /></li>);
      } else if (this.props.panelName === 'Current/Backlog') {
        if (!pixel.icebox && pixel.state !== 'Accepted')
          mapPixels.push(<li key={pixel.id}><PixelListItemContainer pixelId={pixel.id} /></li>);
      } else if (this.props.panelName === 'Done') {
        if (pixel.state === 'Accepted')
          mapPixels.push(<li key={pixel.id}><PixelListItemContainer pixelId={pixel.id} /></li>);
      }
    });

    return (
      <ul>
        {mapPixels}
      </ul>
    );
  }

  handleClick(e) {
    this.props.hideColumn(this.props.sidebarName);
  }

  render() {
    return(
      <article className="panel-container">
        <div className="left-panel-divider"></div>
        <header className="panel-header">
          <button onClick={this.handleClick}></button>
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
