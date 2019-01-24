import React, { Component } from "react";
import TrainingDetail from "./TrainingDetail";
import addTraining from "../../store/actions/addTraining";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class TrainingList extends Component {
  state = {
    totalCost: 0,
    orderedClasses: []
  };

  randClassTypeId = () => Math.random();

  passOrderedClasses = (orderedClasses, totalCost) => {
    const updatedOrderedClasses = [
      ...this.state.orderedClasses,
      orderedClasses
    ];
    console.log({ totalCost });
    this.setState({
      orderedClasses: updatedOrderedClasses,
      totalCost: this.state.totalCost + totalCost
    });
  };

  deleteClasses = (id, totalCost) => {
    const updatedClasses = this.state.orderedClasses.filter((c, index) => {
      return index !== id;
    });
    this.setState({
      orderedClasses: [...updatedClasses],
      totalCost: this.state.totalCost - totalCost
    });
  };

  reserveTraining = () => {
    console.log(this.state);
    const training = this.state.orderedClasses;
    training.trainingStatus = "pending";
    this.props.addTraining(training);
    this.props.history.goBack();
  };

  render() {
    if (this.props.trainerClasses) {
      const { totalCost } = this.state;
      const { trainerClasses } = this.props;
      const { passOrderedClasses, reserveTraining, deleteClasses } = this;

      return (
        <div className="container">
          <table>
            <thead>
              <tr style={centeringContent}>
                <th>Typ aktywności</th>
                <th>Czas Trwania</th>
                <th>Cena (zł)</th>
              </tr>
            </thead>

            <tbody>
              {trainerClasses
                ? trainerClasses.map(classType => {
                    return (
                      <TrainingDetail
                        key={this.randClassTypeId()}
                        trainerClasses={classType}
                        passOrderedClasses={passOrderedClasses}
                      />
                    );
                  })
                : null}
            </tbody>
          </table>
          {this.state.orderedClasses ? (
            <React.Fragment>
              <div>
                {this.state.orderedClasses.map((oc, id) => (
                  <div key={this.randClassTypeId()}>
                    <h6>
                      Dodano {oc.name} w czasie: {oc.duration}min. Koszt -{" "}
                      {oc.totalCost} zł
                    </h6>
                    <button
                      className="btn"
                      onClick={() => {
                        deleteClasses(id, oc.totalCost);
                      }}
                    >
                      Usuń
                    </button>
                  </div>
                ))}
              </div>
              <h6>Całkowity koszt treningu: {totalCost}</h6>
              <button className="btn" onClick={reserveTraining}>
                Umów spotkanie
              </button>
            </React.Fragment>
          ) : null}
        </div>
      );
    } else {
      return <div>loading...</div>;
    }
  }
}

const centeringContent = {
  textAlign: "center",
  display: "flex",
  justifyContent: "space-between"
};

const mapStateToProps = (state, ownProps) => {
  const trainerId = ownProps.match.params.trainerid;

  const trainers = state.firestore.data.trainers;

  const trainerClasses = trainers ? trainers[trainerId].classes : null;

  return { trainerClasses };
};

const mapDispatchToProps = dispatch => {
  return {
    addTraining: training => dispatch(addTraining(training))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "trainers" }])
)(TrainingList);
