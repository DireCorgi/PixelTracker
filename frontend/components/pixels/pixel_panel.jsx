import React from 'react';
import PixelListItemContainer from './pixel_list_item_container';
import PixelFormContainer from './pixel_form_container';

class PixelPanel extends React.Component {
  constructor(props) {
    super(props);

    this.listLength = 0;
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
    this.listLength = mapPixels.length;
    return (
      <ul>
        {mapPixels}
      </ul>
    );
  }

  handleClick(e) {
    this.props.hideColumn(this.props.sidebarName);
  }

  renderPixelForm() {
    if (this.props.panelName === 'Icebox') {
      return (
        <PixelFormContainer
          projectId={this.props.projectId}
          pixelOrd={this.listLength + 1}/>
      );
    } else {
      return null;
    }
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
          {this.renderPixelForm()}
        </section>
      </article>
    );
  }
}

export default PixelPanel;
