import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

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
    if (!this.state.profileLoaded && trainings.length !== 0) {
      console.log({ trainings });
      this.setState({ classes: [...trainings] });
      this.setState({ profileLoaded: true });
    }
  };

  componentDidUpdate() {
    this.addTrainingsToState();
  }

  deleteTraining = id => {
    const trainings = this.state.classes.filter(training => {
      return training.id !== id;
    });
    this.setState({
      classes: [...trainings]
    });
  };

  renderTrainings = () => {
    const trainings = this.state.classes;

    return trainings.map(training => {
      const id = this.randClassTypeId();
      return (
        <li className="collection-item" key={id} id={id}>
          <p> Nazwa Treningu: {training.name}</p>
          <p> Koszt Treningu: {training.cost}</p>
          <button className="btn" onClick={() => this.deleteTraining(id)}>
            Usuń
          </button>
        </li>
      );
    });
  };

  onInputChange = e => {
    const newTraining = {
      ...this.state.newTraining,
      [e.target.id]: e.target.value
    };

    this.setState({ newTraining });
  };

  render() {
    console.log(this.state);
    if (this.props.trainings) {
      console.log(this.props.trainings);
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
                  />
                </div>
              </div>
              <button
                // className="btn disabled"
                className={
                  this.state.newTraining.name && this.state.newTraining.cost
                    ? "btn"
                    : "btn disabled"
                }
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
          <button className="btn" style={buttonsStyle}>
            Zatwierdź
          </button>{" "}
        </div>
      );
    } else {
      return <div>Loading content...</div>;
    }
  }
}

const buttonsStyle = {
  margin: "0 5px"
};

const mapStateToProps = (state, ownProps) => {
  console.log({ state });
  const profileId = ownProps.match.params.profileId;
  const trainings = state.firestore.data.trainers
    ? state.firestore.data.trainers[profileId].classes
    : [];

  return {
    trainings
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "trainers" }])
)(TrainerClasses);
