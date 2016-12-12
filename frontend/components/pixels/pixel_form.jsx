import React from 'react';

class PixelForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pixel_ord: 1,
      state: 'Unstarted',
      title: '',
      category: 'Feature',
      description: '',
      points: 0,
      icebox: true,
      id: "",
    };

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handlePointsChange = this.handlePointsChange.bind(this);
  }

  handleCategoryChange(e){

  }

  handlePointsChange(e){

  }

  render() {
    let button = (<button><i className="material-icons">keyboard_arrow_down</i></button>);
    if (this.state.id === "") {
      button = null;
    }

    return (
      <form className='pixel-form'>
        {button}
        <input type="text"
          value={this.state.title}
          placeholder='Pixel title' />
        <nav className="pixel-form-nav group">
          <div className="left-form-nav">
            <div className="id-number">ID: {this.state.id}</div>
            <button className="delete-button"><i className="material-icons">delete</i></button>
          </div>
          <div className="right-form-nav">
            <button className="cancel-button">cancel</button>
            <button className="save-button">Save</button>
          </div>
        </nav>
        <section className="drop-down-features">
          <label>PIXEL CATEGORY
            <select value={this.state.category}
              onChange={this.handleCategoryChange}>
              <option value="Feature">Feature</option>
              <option value="Bug">Bug</option>
              <option value="Chore">Build</option>
              <option value="Release">Relase</option>
            </select>
          </label>
          <label>POINTS
            <select value={this.state.points}
              onChange={this.handlePointsChange}>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
        </section>
        <label>Description
          <textarea value={this.state.description}></textarea>
        </label>
      </form>
    );
  }
}

export default PixelForm;
