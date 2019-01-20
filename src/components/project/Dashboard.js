import React, { Component } from "react";
import Profile from "./profile/Profile";
import Notifications from "./notifications/Notifications";
import TrainerList from "./trainers/TrainerList";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class Dashboard extends Component {
  state = {
    // trainers: [
    //   {
    //     trainerId: 1,
    //     first_name: "Claudio ",
    //     last_name: "Ruiz",
    //     description:
    //       "Cześć jestem Claudio ! Jestem trenerem personalnym od 7 lat. Zajmuję się profesjonalnym treningiem cardio oraz CrossFit. Dużą wagę przywiązuję do jakości przeprowadzanych zajęć, co pozytywnie przekłada się na zainteresowanie ćwiczących.",
    //     photo:
    //       "https://images.pexels.com/photos/733500/pexels-photo-733500.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    //     // classes: ["Cardio", "Cross-Fit"],
    //     classes: [{ type: "Cardio", cost: 30 }, { type: "CrossFit", cost: 50 }]
    //   },
    //   {
    //     trainerId: 2,
    //     first_name: "Claudio ",
    //     last_name: "Ruiz",
    //     description:
    //       "Cześć jestem Claudio ! Jestem trenerem personalnym od 7 lat. Zajmuję się profesjonalnym treningiem cardio oraz CrossFit. Dużą wagę przywiązuję do jakości przeprowadzanych zajęć, co pozytywnie przekłada się na zainteresowanie ćwiczących.",
    //     photo:
    //       "https://images.pexels.com/photos/733500/pexels-photo-733500.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    //     classes: [{ type: "Cardio", cost: 30 }, { type: "CrossFit", cost: 50 }]
    //   }
    // ]
  };

  render() {
    const { trainers, profile } = this.props;
    console.log(profile);
    if (!trainers) {
      return <div>Ładowanie...</div>;
    } else {
      return (
        <div className="container" style={dashboardContainerStyle}>
          <div className="row">
            <Profile profile={profile} />
            <Notifications />
            <TrainerList trainers={trainers} />
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
  // console.log(state);
  // const getUser = () => {
  //   const id = parseInt(ownProps.match.params.id);
  //   const userProfile = state.firestore.ordered.users.filter(user => {
  //     return user.id === id;
  //   })[0];

  //   const trainerProfile = state.firestore.ordered.trainers.filter(trainer => {
  //     return trainer.id === id;
  //   })[0];

  //   console.log(userProfile, trainerProfile);
  //   const data = userProfile ? userProfile : trainerProfile;

  //   return data;
  // };

  // !!! wprowadzić asynchroniczność w kod

  console.log(state);
  const id = parseInt(ownProps.match.params.id);
  console.log(state);

  return {
    profile: state.firestore.ordered.users,

    trainers: state.firestore.ordered.trainers
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "users" }, { collection: "trainers" }])
)(Dashboard);
