import React from 'react';


class PixelForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
  }

  handleCategoryChange(e) {
    const newCategory = e.target.value;
    if (newCategory !== 'Feature')
      this.resetPoints();
    this.setState({ category: newCategory });
  }

  handlePointsChange(e) {
    const newPoints = parseInt(e.target.value);
    this.setState({ points: newPoints });
  }

  handleTitleChange(e) {
    const newTitle = e.currentTarget.value;
    this.setState({ title: newTitle });
  }

  handleDescriptionChange(e) {
    const newDescription = e.currentTarget.value;
    this.setState({ description: newDescription });
  }

  handleSumbit(e) {
    e.preventDefault();
    const pixel = this.state;
    pixel.pixel_ord = this.props.pixelOrd;
    this.props.createPixel(this.props.projectId, pixel);
  }

  resetPoints() {
    this.setState({ points: 0 });
  }


  render() {
    let button = (
      <button><i className="material-icons">keyboard_arrow_down</i></button>
    );
    if (this.state.id === "") {
      button = null;
    }

    let disabled = false;
    if (this.state.category !== 'Feature') {
      disabled = true;
    }

    return (
      <form className='pixel-form'>
        {button}
        <input type="text"
          value={this.state.title}
          onChange={this.handleTitleChange}
          placeholder='Pixel title' />
        <nav className="pixel-form-nav group">
          <div className="left-form-nav">
            <div className="id-number">ID: {this.state.id}</div>
            <button className="delete-button"><i className="material-icons">delete</i></button>
          </div>
          <div className="right-form-nav">
            <button className="cancel-button">cancel</button>
            <button className="save-button" onClick={this.handleSumbit}>Save</button>
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
              onChange={this.handlePointsChange}
              disabled={disabled}>
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
          <textarea
            value={this.state.description}
            onChange={this.handleDescriptionChange} />
        </label>
      </form>
    );
  }
}

export default PixelForm;
