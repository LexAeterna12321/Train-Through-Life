import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import editTrainerClasses from "../../store/actions/editTrainerClasses";

class TrainerClasses extends Component {
  state = {
    newTraining: {
      name: "",
      cost: ""
    },
    classes: [],
    profileLoaded: false
  };

  randClassTypeId = () => Math.random();

  addTrainingsToState = () => {
    const trainings = this.props.trainings;
    if (!this.state.profileLoaded && (trainings && trainings.length !== 0)) {
      this.setState({ classes: [...trainings] });
      this.setState({ profileLoaded: true });
    } else return null;
  };

  componentDidMount() {
    this.addTrainingsToState();
  }

  deleteTraining = e => {
    const targetId = parseInt(e.target.parentNode.id);

    const trainings = this.state.classes.filter((training, index) => {
      return index !== targetId;
    });

    this.setState({
      classes: [...trainings]
    });
  };

  addTraining = e => {
    e.preventDefault();
    const classes = [...this.state.classes, this.state.newTraining];

    this.setState({ classes });
    this.setState({ newTraining: { name: "", cost: "" } });
  };

  renderTrainings = () => {
    const trainings = this.state.classes;

    return trainings.map((training, index) => {
      const id = Math.random();

      return (
        <li className="collection-item" key={id} id={index}>
          <p> Nazwa Treningu: {training.name}</p>
          <p> Koszt Treningu: {training.cost}</p>
          <button className="btn" onClick={e => this.deleteTraining(e)}>
            Usuń
          </button>
        </li>
      );
    });
  };

  onInputChange = e => {
    const updatedTraining =
      e.target.id === "cost"
        ? { [e.target.id]: parseInt(e.target.value) }
        : { [e.target.id]: e.target.value };

    const newTraining = {
      ...this.state.newTraining,
      ...updatedTraining
    };

    this.setState({ newTraining });
  };

  editClasses = () => {
    const id = this.props.match.params.profileId;

    this.props.editClasses(this.state.classes, id);

    this.props.history.push(`/dashboard/${id}`);
  };

  render() {
    const profileId = this.props.match.params.profileId;
    return (
      <div className="container center">
        <h3>Edytuj Treningi</h3>
        <div className="row">
          <form className="col s12">
            <div className="row ">
              <div className="input-field col s6">
                <input
                  id="name"
                  type="text"
                  className="validate"
                  required
                  placeholder=" Nazwa Treningu"
                  onChange={this.onInputChange}
                  value={this.state.newTraining.name}
                />
              </div>
              <div className="input-field col s6">
                <input
                  id="cost"
                  type="number"
                  min="0"
                  className="validate"
                  required
                  placeholder="Koszt za 30 min"
                  onChange={this.onInputChange}
                  value={this.state.newTraining.cost}
                />
              </div>
            </div>
            <button
              className={
                this.state.newTraining.name && this.state.newTraining.cost
                  ? "btn"
                  : "btn disabled"
              }
              onClick={this.addTraining}
              style={buttonsStyle}
            >
              Dodaj
            </button>{" "}
          </form>
        </div>
        <div className="row">
          <ul className="collection">{this.renderTrainings()}</ul>
        </div>
        <Link
          to={`/dashboard/${profileId}`}
          className="btn"
          style={buttonsStyle}
        >
          Powrót
        </Link>
        <button className="btn" style={buttonsStyle} onClick={this.editClasses}>
          Zatwierdź
        </button>{" "}
      </div>
    );
  }
}

const buttonsStyle = {
  margin: "0 5px"
};

const mapStateToProps = (state, ownProps) => {
  const profileId = ownProps.match.params.profileId;
  const trainings = state.firestore.data.trainers
    ? state.firestore.data.trainers[profileId].classes
    : [];

  return {
    trainings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editClasses: (classes, id) => dispatch(editTrainerClasses(classes, id))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "trainers" }])
)(TrainerClasses);
