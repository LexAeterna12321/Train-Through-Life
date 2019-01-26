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

  renderNotifications = () => {
    const { profileId } = this.props;
    console.log({ profileId });
    return this.props.notifications.map(notification => {
      console.log({ notification });
      const { userId, trainerId } = notification.info;
      if (userId === profileId || trainerId === profileId) {
        return (
          <Notification
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
      return (
        <div className="card col s12 m8 l3 offset-m2 offset-l1">
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

const mapStateToProps = (state, ownProps) => {
  console.log(state, ownProps);
  const notifications = state.firestore.ordered.notifications;
  return {
    notifications
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "notifications" }])
)(Notifications);
