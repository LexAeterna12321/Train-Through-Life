import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import editTraining from "../../store/actions/editTraining";

class EditTraining extends Component {
  state = {
    trainingStatus: "approved",
    approvedChecked: true,
    canceledChecked: false
  };

  onInputChange = e => {
    if (e.target.id === "approved") {
      this.setState({
        approvedChecked: true,
        canceledChecked: false,
        trainingStatus: e.target.id
      });
    } else if (e.target.id === "canceled") {
      this.setState({
        approvedChecked: false,
        canceledChecked: true,
        trainingStatus: e.target.id
      });
    }
  };

  resolveTraining = () => {
    // id of notification to update through actionCreator
    const trainingId = this.props.match.params.trainingId;

    this.props.editTraining(this.state.trainingStatus, trainingId);
  };

  calculateTotalCost = () => {
    const { training } = this.props.notification[0];
    let totalCost = training.map(t => t.totalCost);
    return totalCost.reduce((a, b) => {
      return a + b;
    }, 0);
  };

  randTrainingId = () => Math.random();

  renderTrainingList = () => {
    const { training } = this.props.notification[0];

    return training.map(t => {
      return (
        <div key={this.randTrainingId()} style={trainingListStyle}>
          <p>Nazwa Treningu: {t.name}</p>
          <p>Czas Trwania Treningu: {t.duration}</p>
          <p>Kwota Zapłaty Za Trening: {t.totalCost}</p>
        </div>
      );
    });
  };

  render() {
    const checkboxes = () => (
      <React.Fragment>
        <p>
          <label className="left-align">
            <input
              id="approved"
              type="checkbox"
              onChange={this.onInputChange}
              checked={this.state.approvedChecked}
            />
            <span className="green-text">Potwierdź Trening</span>
          </label>
        </p>
        <p>
          <label className="left-align">
            <input
              className="red-text"
              id="canceled"
              type="checkbox"
              onChange={this.onInputChange}
              checked={this.state.canceledChecked}
            />
            <span className="red-text">Anuluj Trening</span>
          </label>
        </p>
      </React.Fragment>
    );

    const { notification, first_name, last_name } = this.props;

    if (!notification) return <Loader />;
    else {
      const {
        date,
        time,
        description,
        trainerId
      } = this.props.notification[0].info;
      return (
        <div className="container center">
          <h3 className="">Zarządzaj Treningiem</h3>

          <div className="row ">
            <div className="col s12 center">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <h6 className="card-title">
                    Trening wysłany od użytkownika {first_name} {last_name}
                  </h6>
                  <p>
                    Proponowana Data Spotkania: {date} {time}
                  </p>
                  <div style={trainingListStyle}>
                    Wiadomości Dodatkowe:
                    <p>{description}</p>
                  </div>
                  {this.renderTrainingList()}
                  <p
                    className="green-text text-lighten-2 flow-text"
                    style={trainingListStyle}
                  >
                    Kwota Za Proponowane Treningi: {this.calculateTotalCost()}{" "}
                    zł
                  </p>
                </div>
                <div className="input-field col s10 m6" style={checkboxesStyle}>
                  <span>Wybierz akcję związaną z treningiem:</span>
                  {checkboxes()}
                </div>
              </div>
            </div>
          </div>

          <Link
            to={`/dashboard/${trainerId}`}
            className="btn"
            style={{ margin: "10px" }}
          >
            {" "}
            Wróć do panelu głównego
          </Link>
          <Link
            onClick={this.resolveTraining}
            to={`/dashboard/${trainerId}`}
            className="btn"
            style={{ margin: "10px" }}
          >
            Zatwierdź wybór
          </Link>
        </div>
      );
    }
  }
}

const checkboxesStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center"
};

const trainingListStyle = {
  padding: "15px 0",
  textAlign: "left"
};

const mapStateToProps = (state, ownProps) => {
  if (state.firestore.ordered.notifications) {
    const trainingId = ownProps.match.params.trainingId;
    const notifications = state.firestore.ordered.notifications
      ? state.firestore.ordered.notifications
      : [];
    const notification = notifications.filter(
      notifi => trainingId === notifi.id
    );

    const userId = notification[0].info.userId;

    const first_name = userId
      ? state.firestore.data.users[userId].first_name
      : null;
    const last_name = userId
      ? state.firestore.data.users[userId].last_name
      : null;
    return {
      notification,
      first_name,
      last_name
    };
  } else return {};
};

const mapDispatchToProps = dispatch => {
  return {
    editTraining: (trainingStatus, trainingId) =>
      dispatch(editTraining(trainingStatus, trainingId))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "users" }, { collection: "notifications" }])
)(EditTraining);
