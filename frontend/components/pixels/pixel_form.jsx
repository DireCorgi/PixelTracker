import React from 'react';
import { Spinner2 } from '../spinners/spinners';
import CommentsContainer from './comments_container';
import TasksContainer from './tasks_container';
import { newPixelState, buttonName }
  from '../../util/pixel_state_util.js';

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

    this.mounted = true;
    this.deleted = false;

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handlePointsChange = this.handlePointsChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleNextState = this.handleNextState.bind(this);
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
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleNextState(nextState = null) {
    if (nextState === null) {
      nextState = newPixelState(this.state.state);
    }

    return (e) => {
      e.preventDefault();
      const target = e.currentTarget;
      target.disabled = true;
      const newState = nextState;
      let newOrd = this.state.pixel_ord;
      if (this.state.icebox) {
        newOrd = this.props.ords.maxBacklog + 1;
      }
      if (this.state.state === "Accepted") {
        newOrd = this.props.ords.maxBacklog + 1;
      }
      if (newState === "Accepted") {
        newOrd = this.props.ords.maxDone + 1;
      }
      if (nextState === 'Unstarted') {
        newOrd = this.props.ords.maxUnstarted + 1;
      }
      this.setState({ state: newState, icebox: false, pixel_ord: newOrd });
      const pixel = { id: this.state.id, state: newState, icebox: false, pixel_ord: newOrd };
      this.props.updatePixel(pixel.id, pixel).then(
        () => {
          target.disabled = false;
          if (this.mounted)
          this.resetState();
        },
        () => {
          target.disabled = false;
        }
      );
    };
  }

  handleStateChange(e) {
    e.preventDefault();
    const target = e.currentTarget;
    const newState = e.currentTarget.value;
    let newOrd = this.state.pixel_ord;
    if (this.state.icebox) {
      newOrd = this.props.ords.maxBacklog + 1;
    }
    if (this.state.state === "Accepted") {
      newOrd = this.props.ords.maxBacklog + 1;
    }
    if (newState === "Accepted") {
      newOrd = this.props.ords.maxDone + 1;
    }
    if (newState === 'Unstarted') {
      newOrd = this.props.ords.maxUnstarted + 1;
    }
    this.setState({ state: newState });
    const pixel = { id: this.state.id, state: newState, icebox: false, pixel_ord: newOrd };
    this.props.updatePixel(pixel.id, pixel).then(
      () => {
        target.disabled = false;
        if (this.mounted)
          this.resetState();
      },
      () => {
        target.disabled = false;
      }
    );
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
    const target = e.currentTarget;
    e.preventDefault();
    target.disabled = true;
    const pixel = Object.assign({}, this.state);
    pixel.tasks_attributes = this.props.tasks;
    if (this.props.formType === 'create') {
      pixel.pixel_ord = this.props.ords.maxIcebox + 1;
      this.props.createPixel(this.props.projectId, pixel).then(
        () => {
          target.disabled = false;
          this.resetState();
        },
        () => {
          target.disabled = false;
        }
      );
    } else if (this.props.formType === 'update') {
      this.props.updatePixel(pixel.id, pixel).then(
        () => {
          target.disabled = false;
          if (this.mounted)
            this.resetState();
        },
        () => {
          target.disabled = false;
        }
      );
    }
  }

  handleDelete(e) {
    e.preventDefault();
    e.currentTarget.disabled = true;
    if (this.props.formType === 'update' && !this.deleted) {
      this.deleted = true;
      e.currentTarget.disabled = false;
      this.props.removePixel(this.state.id).then(() => {
        this.deleted = false;
      });
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

  renderButton() {
    const name = buttonName(this.state.state);
    if (name === 'none' || this.state.id === "") {
      return null;
    }
    const className = `next-state-button drop-down-button ${name}-button`;
    return (
      <button className={className} onClick={this.handleNextState()}>
        {name}
      </button>
    );
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

    const stateDisabled = (this.props.formType === 'create');

    let rejectButton = null;
    if (this.state.state === 'Delivered')
      rejectButton = (
        <button
          className="next-state-button drop-down-button Reject-button"
          onClick={this.handleNextState('Rejected')}>Reject
        </button>
      );

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
          <label>STATE
            <select value={this.state.state}
              onChange={this.handleStateChange}
              disabled={stateDisabled}>
              <option value="Unstarted">Unstarted</option>
              <option value="Started">Started</option>
              <option value="Finished">Finished</option>
              <option value="Delivered">Delivered</option>
              <option value="Rejected">Rejected</option>
              <option value="Accepted">Accepted</option>
            </select>
            {rejectButton}
            {this.renderButton()}
          </label>
        </section>
        <label>Description
          <textarea
            value={this.state.description}
            onChange={this.handleDescriptionChange} />
        </label>
        <TasksContainer pixelId={this.state.id}/>
        {comments}
      </form>
    );
  }
}

export default PixelForm;
