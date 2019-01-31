import React, { Component } from "react";

import Notification from "./Notification";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class Notifications extends Component {
  // przerobić notyfikacje z rozbiciem na pojedyńczy element. Trzy fazy umawiania spotkań akceptacja, oczekiwanie, anulowanie. W zależności od fazy różne style użyte w notyfikacji
  state = {
    notifications: []
  };

  notificationLimit = 4;

  renderNotifications = () => {
    const { profileId, profile, notifications } = this.props;

    // get last 3 notifications from the array
    const notificationsSliced = notifications
      ? notifications.slice(0, this.notificationLimit)
      : notifications;

    return notificationsSliced.map(notification => {
      const { userId, trainerId } = notification.info;
      if (userId === profileId || trainerId === profileId) {
        return (
          <Notification
            profile={profile}
            notification={notification}
            key={notification.id}
            profileId={profileId}
          />
        );
      }
      return null;
    });
  };

  render() {
    if (this.props.notifications) {
      const { profile } = this.props;
      return (
        // trainer/user dashboard view
        <div
          className={
            profile.user
              ? "card col s12 m8 l3 offset-m2 offset-l1"
              : "card col s12 m6 offset-m1 l6 offset-l1  "
          }
        >
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <h5 className="card-title center" style={headerStyle}>
                Twoje Ostatnie Aktywności
              </h5>
              <ul>{this.renderNotifications()}</ul>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
const headerStyle = { margin: "10px 0" };

const mapStateToProps = state => {
  let notifications = state.firestore.ordered.notifications;

  // sort by timestamps
  notifications = notifications.sort((a, b) => {
    if (a.createdAt > b.createdAt) {
      return -1;
    } else {
      return 1;
    }
  });

  return {
    notifications
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {
      // orderBy: [["createdAt", "desc"]],
      collection: "notifications"
    }
  ])
)(Notifications);
