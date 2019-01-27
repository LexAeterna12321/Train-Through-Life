import React, { Component } from "react";
import TrainingDetail from "./TrainingDetail";
import addTraining from "../../store/actions/addTraining";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import DatePicker from "./DatePicker";

class TrainingList extends Component {
  state = {
    totalCost: 0,
    orderedClasses: [],
    date: "",
    time: "",
    description: ""
  };

  setTrainingDate = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  randClassTypeId = () => Math.random();

  // passing data from lower components
  passOrderedClasses = (orderedClasses, totalCost) => {
    const updatedOrderedClasses = [
      ...this.state.orderedClasses,
      orderedClasses
    ];

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

  // sends data to database in notification collection
  reserveTraining = () => {
    const { trainerid, userid } = this.props.match.params;

    const training = this.state.orderedClasses;

    const info = {};
    // adding trainer and user id to notification collection
    info.trainerId = trainerid;
    info.userId = userid;
    // adding starting status
    info.trainingStatus = "pending";
    // date and time of training
    info.date = this.state.date;
    info.time = this.state.time;
    // additional info for trainer
    info.description = this.state.description;

    this.props.addTraining(training, info);
    this.props.history.goBack();
  };

  render() {
    if (this.props.trainerClasses) {
      const { totalCost, orderedClasses, date, time, description } = this.state;
      const { trainerClasses } = this.props;
      const {
        passOrderedClasses,
        reserveTraining,
        deleteClasses,
        setTrainingDate
      } = this;

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
              {/* datePicker */}
              {this.state.orderedClasses.length > 0 ? (
                <DatePicker
                  setTrainingDate={setTrainingDate}
                  date={date}
                  time={time}
                  description={description}
                />
              ) : (
                ""
              )}
              {/*  */}
              <button
                className={
                  orderedClasses.length !== 0 &&
                  date !== "" &&
                  time !== "" &&
                  description !== ""
                    ? "btn"
                    : "btn disabled"
                }
                onClick={reserveTraining}
              >
                Umów spotkanie
              </button>{" "}
            </React.Fragment>
          ) : null}
        </div>
      );
    } else {
      return (
        <div className="center valign-center flow-text">
          Trener nie dodał jeszcze żadnych zajęć do swojej oferty treningowej.
        </div>
      );
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
    addTraining: (training, info) => dispatch(addTraining(training, info))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "trainers" }])
)(TrainingList);
