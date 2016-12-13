import React from 'react';
import { Spinner } from '../spinners/spinners';
import CommentsContainer from './comments_container';

class PixelForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.formType === 'create') {
      this.state = {
        state: 'Unstarted',
        title: '',
        category: 'Feature',
        description: '',
        points: 0,
        icebox: true,
        id: "",
      };
    } else if (this.props.formType === 'update') {
      this.state = this.props.pixel;
    }

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handlePointsChange = this.handlePointsChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  resetState() {
    const defaultState = {
      state: 'Unstarted',
      title: '',
      category: 'Feature',
      description: '',
      points: 0,
      icebox: true,
      id: "",
    };
    if (this.props.formType === 'create'){
      this.setState(defaultState);
      this.props.hideForm();
    }
    this.props.resetPixelErrors();
    if (this.props.formType === 'update') {
      this.props.handleClick();
    }
  }

  componentDidMount() {
    this.props.resetPixelErrors();
  }

  handleClick(e) {
    e.preventDefault();
    if (this.props.formType === 'update') {
      this.props.handleClick();
    } else if (this.props.formType === 'create') {
      this.resetState();
      this.props.hideForm();
    }
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

  handleSubmit(e) {
    e.preventDefault();
    const pixel = this.state;
    if (this.props.formType === 'create') {
      pixel.pixel_ord = this.props.pixelOrd;
      this.props.createPixel(this.props.projectId, pixel).then(
        () => {
          this.resetState();
        }
      );
    } else if (this.props.formType === 'update') {
      this.props.updatePixel(pixel.id, pixel).then(
        () => {
          this.resetState();
        }
      );
    }
  }

  handleDelete(e) {
    e.preventDefault();
    if (this.props.formType === 'update') {
      this.props.removePixel(this.state.id);
    }
  }

  resetPoints() {
    this.setState({ points: 0 });
  }

  titleClass() {
    if (this.props.errors.title === undefined) {
      return "";
    } else {
      return "errored-title";
    }
  }

  render() {
    let button = (
      <button onClick={this.props.handleClick}>
        <i className="material-icons">keyboard_arrow_down</i>
      </button>
    );

    let comments = (
      <CommentsContainer pixelId={this.state.id}/>
    );

    if (this.state.id === "") {
      button = null;
      comments = null;
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
          placeholder='Pixel title'
          className={this.titleClass()}/>
        <nav className="pixel-form-nav group">
          <div className="left-form-nav">
            <div className="id-number">ID: {this.state.id}</div>
            <button className="delete-button" onClick={this.handleDelete}><i className="material-icons">delete</i>
            </button>
          </div>
          <div className="right-form-nav">
            <button className="cancel-button" onClick={this.handleClick}>cancel</button>
            <button className="save-button" onClick={this.handleSubmit}>Save</button>
          </div>
        </nav>
        <section className="drop-down-features">
          <label>CATEGORY
            <select value={this.state.category}
              onChange={this.handleCategoryChange}>
              <option value="Feature">Feature</option>
              <option value="Bug">Bug</option>
              <option value="Chore">Build</option>
              <option value="Release">Release</option>
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
        {comments}
      </form>
    );
  }
}

export default PixelForm;
