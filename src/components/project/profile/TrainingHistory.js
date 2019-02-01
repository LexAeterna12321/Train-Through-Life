import React from "react";

import Notification from "../notifications/Notification";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const TrainingHistory = props => {
  const renderNotifications = () => {
    const { profileId, profile, notifications } = props;

    // filter to get right notifs
    const notificationsFiltered = [
      ...notifications.filter(n => {
        const { userId, trainerId } = n.info;
        return userId === profileId || trainerId === profileId;
      })
    ]
      // sort by timestamps
      .sort((a, b) => {
        if (a.createdAt > b.createdAt) {
          return -1;
        } else {
          return 1;
        }
      });

    return notificationsFiltered.map(notification => {
      return (
        <Notification
          profile={profile}
          notification={notification}
          key={notification.id}
          profileId={profileId}
        />
      );
    });
  };

  if (props.notifications) {
    return (
      <div className="container">
        <div className="card col s12">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <h5 className="card-title center" style={headerStyle}>
                Historia Twoich Treningów
              </h5>
              <ul>{renderNotifications()}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const headerStyle = { margin: "10px 0" };

const mapStateToProps = (state, ownProps) => {
  let notifications = state.firestore.ordered.notifications;

  const id = ownProps.match.params.profileId;
  const users = state.firestore.data.users;
  const trainers = state.firestore.data.trainers;

  const profiles = { ...users, ...trainers };

  const profile = profiles ? profiles[id] : null;

  return {
    profile,
    profileId: id,
    trainers: state.firestore.ordered.trainers,
    notifications,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "users" },
    { collection: "trainers" },
    { collection: "notifications" }
  ])
)(TrainingHistory);
