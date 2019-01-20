import React, { Component } from "react";
import Profile from "./profile/Profile";
import Notifications from "./notifications/Notifications";
import TrainerList from "./trainers/TrainerList";
import { connect } from "react-redux";
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

const dashboardContainerStyle = {
  maxWidth: "1800px",
  width: "90%"
};

const mapStateToProps = (state, ownProps) => {
  const id = parseInt(ownProps.match.params.id);

  const userProfile = state.users.users.filter(user => {
    return user.id === id;
  })[0];
  const trainerProfile = state.users.trainers.filter(trainer => {
    return trainer.id === id;
  })[0];

  return {
    // finds correct user by id delivered from signIn component
    profile: userProfile ? userProfile : trainerProfile,
    trainers: state.users.trainers
  };
};

export default connect(mapStateToProps)(Dashboard);
