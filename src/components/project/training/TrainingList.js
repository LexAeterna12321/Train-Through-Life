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
    description: "",
    correctDate: true
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
    const { date, time, description } = this.state;
    const training = this.state.orderedClasses;

    const info = {};
    // adding trainer and user id to notification collection
    info.trainerId = trainerid;
    info.userId = userid;
    // adding starting status
    info.trainingStatus = "pending";
    // date and time of training
    info.date = date;
    info.time = time;
    // additional info for trainer
    info.description = description;

    const years = parseInt(info.date.split("-")[0]);
    const months = parseInt(info.date.split("-")[1]);
    const days = parseInt(info.date.split("-")[2]);
    const hours = parseInt(info.time.split(":")[0]);
    const mins = parseInt(info.time.split(":")[1]);

    // parsing local time from state to UTC
    const utcDate = Date.UTC(years, months - 1, days, hours - 1, mins, 0, 0);

    if (utcDate < Date.now()) {
      this.setState({ correctDate: false });
      return;
    } else {
      this.setState({ correctDate: true });
      this.props.addTraining(training, info);
      this.props.history.goBack();
    }
  };

  render() {
    if (this.props.trainerClasses) {
      const {
        totalCost,
        orderedClasses,
        date,
        time,
        description,
        correctDate
      } = this.state;
      const { trainerClasses } = this.props;
      const {
        passOrderedClasses,
        reserveTraining,
        deleteClasses,
        setTrainingDate
      } = this;

      return (
        <div className="container">
          <h4 className="center">Dodawanie Treninu</h4>
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

          {this.state.orderedClasses ? (
            <React.Fragment>
              <div
                className="col s12 card blue-grey darken-1"
                style={{ padding: "10px" }}
              >
                {this.state.orderedClasses.map((oc, id) => (
                  <div key={this.randClassTypeId()} className="white-text">
                    <h6>Dodano: {oc.name}</h6>
                    <h6>Czas: {oc.duration}min</h6>
                    <h6>Koszt: {oc.totalCost} zł</h6>
                    <button
                      className="btn"
                      onClick={() => {
                        deleteClasses(id, oc.totalCost);
                      }}
                    >
                      Usuń
                    </button>
                  </div>
                ))}{" "}
                <h6 className="white-text">
                  Całkowity koszt treningu: {totalCost}
                </h6>
              </div>
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
              {correctDate ? null : (
                <h5 className="center red-text lighten-text-4">
                  Podana data jest zbyt wczesna
                </h5>
              )}
              <button
                className={
                  orderedClasses.length !== 0 &&
                  date !== "" &&
                  time !== "" &&
                  description !== ""
                    ? "btn"
                    : "btn disabled"
                }
                style={{ margin: "10px 0" }}
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

// const centeringContent = {
//   textAlign: "center",
//   display: "flex",
//   justifyContent: "space-between"
// };

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
