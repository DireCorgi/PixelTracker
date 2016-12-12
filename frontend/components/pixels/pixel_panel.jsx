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
    this.props.pixels.sort((a,b) => {
      if (a.pixel_ord > b.pixel_ord) {
        return 1;
      } else {
        return -1;
      }
    });
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
    if (this.props.panelName === 'Icebox' && this.props.sidebar.newPixel) {
      return (
        <PixelFormContainer
          projectId={this.props.projectId}
          pixelOrd={this.listLength + 1}
          formType="create"/>
      );
    } else {
      return null;
    }
  }

  render() {
    return(
      <article className="panel-container">
        <header className="panel-header">
          <button onClick={this.handleClick}></button>
          { this.props.panelName }
        </header>
        {this.renderPixelForm()}
        <section className="panel-list">
          {this.pixelSummary()}
        </section>
      </article>
    );
  }
}

export default PixelPanel;
