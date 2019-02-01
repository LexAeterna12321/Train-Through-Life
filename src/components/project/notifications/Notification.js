import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";

const Notification = props => {
  const {
    info: { trainingStatus, date, time },
    training,
    id
  } = props.notification;

  const { first_name, last_name, profile, match } = props;

  const renderTrainingList = () => {
    return training.map((t, index) => {
      return <span key={index}>{t.name}, </span>;
    });
  };

  const calculateTotalCost = () => {
    let totalCost = training.map(t => t.totalCost);
    return totalCost.reduce((a, b) => {
      return a + b;
    }, 0);
  };

  const calculateTotalDuration = () => {
    let totalDuration = training.map(t => t.duration);
    return totalDuration.reduce((a, b) => {
      return a + b;
    }, 0);
  };

  switch (trainingStatus) {
    case "pending":
      return (
        <li style={notificationStyle}>
          <h5>
            {/* creates links to training edition only in elements with passed match prop */}
            {profile.trainer && match ? (
              <Link to={`/editTraining/${id}`} style={linkStyle}>
                {" "}
                Otrzymano ofertę spotkania z {first_name} {last_name}
              </Link>
            ) : (
              `Wysłano ofertę spotkania z ${first_name} ${last_name}`
            )}
          </h5>
          <p>
            Status:{" "}
            <span style={trainingPendingStyle}>"czeka na potwierdzenie"</span>
            <i className="material-icons right" style={trainingPendingStyle}>
              alarm
            </i>
          </p>
          <p>
            Data:{" "}
            <span style={trainingPendingStyle}>
              {time} / {date}
            </span>
          </p>
          <p>
            Typ zajęć:{" "}
            <span style={trainingPendingStyle}>{renderTrainingList()}</span>
          </p>
          <p>
            Koszt / Czas Trwania:{" "}
            <span style={trainingPendingStyle}>
              {calculateTotalCost()} zł / {calculateTotalDuration()} min
            </span>
          </p>
        </li>
      );
    case "approved":
      return (
        <li style={notificationStyle}>
          <h5>
            Umówiono spotkanie z {first_name} {last_name}
          </h5>
          <p>
            Status: <span style={trainingApprovedStyle}>"potwierdzone"</span>
            <i className="material-icons right" style={trainingApprovedStyle}>
              alarm_on
            </i>
          </p>
          <p>
            Data:{" "}
            <span style={trainingApprovedStyle}>
              {time} / {date}
            </span>
          </p>
          <p>
            Typ zajęć:{" "}
            <span style={trainingApprovedStyle}>{renderTrainingList()}</span>
          </p>
          <p>
            Koszt / Czas Trwania:{" "}
            <span style={trainingApprovedStyle}>
              {calculateTotalCost()} zł / {calculateTotalDuration()} min
            </span>
          </p>
        </li>
      );
    case "canceled":
      return (
        <li style={notificationStyle}>
          <h5>
            Odwołano spotkanie z {first_name} {last_name}
          </h5>
          <p>
            Status:{" "}
            <span style={trainingCanceledStyle}>"anulowane przez trenera"</span>
            <i className="material-icons right" style={trainingCanceledStyle}>
              alarm_off
            </i>
          </p>
          <p>
            Data:{" "}
            <span style={trainingCanceledStyle}>
              {time} / {date}
            </span>
          </p>
          <p>
            Typ zajęć:{" "}
            <span style={trainingCanceledStyle}>{renderTrainingList()}</span>
          </p>
          <p>
            Koszt / Czas Trwania:{" "}
            <span style={trainingCanceledStyle}>
              {calculateTotalCost()} zł / {calculateTotalDuration()} min
            </span>
          </p>
        </li>
      );

    default:
      return <div>Loading...</div>;
  }
};

const linkStyle = {
  color: "#ffab40"
};

const notificationStyle = {
  border: "2px solid gray",
  padding: "15px",
  margin: "10px 0"
};

const trainingApprovedStyle = {
  color: "#33ca9a"
};

const trainingPendingStyle = {
  color: "#f1c40f"
};

const trainingCanceledStyle = {
  color: "#FF5252"
};
const mapStateToProps = (state, ownProps) => {
  if (state.firestore.data.trainers[ownProps.profileId]) {
    const userId = ownProps.notification.info.userId;
    const first_name = state.firestore.data.users[userId].first_name;
    const last_name = state.firestore.data.users[userId].last_name;

    return { first_name, last_name };
  } else if (state.firestore.data.users[ownProps.profileId]) {
    const trainerId = ownProps.notification.info.trainerId;
    const first_name = state.firestore.data.trainers[trainerId].first_name;
    const last_name = state.firestore.data.trainers[trainerId].last_name;
    return { first_name, last_name };
  }
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "users" },
    { collection: "trainers" },
    { collection: "notifications" }
  ])
)(Notification);
