import React, { Component } from "react";
import Profile from "./profile/Profile";
import Notifications from "./notifications/Notifications";
import TrainerList from "./trainers/TrainerList";
import Loader from "./Loader";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class Dashboard extends Component {
  render() {
    const { trainers, profile, profileId, notifications } = this.props;
    console.log({ profile, profileId });

    if (!trainers || !profile || !profileId || !notifications) {
      return <Loader />;
    } else {
      return (
        <div className="container" style={dashboardContainerStyle}>
          <div className="row">
            <Profile profile={profile} profileId={profileId} />
            <Notifications profileId={profileId} profile={profile} />
            {profile.user ? (
              <TrainerList trainers={trainers} userId={profileId} />
            ) : null}
          </div>
        </div>
      );
    }
  }
}

const dashboardContainerStyle = {
  maxWidth: "1800px",
  width: "90%"
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const users = state.firestore.data.users;
  const trainers = state.firestore.data.trainers;
  const notifications = state.firestore.data.notifications;
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
)(Dashboard);
