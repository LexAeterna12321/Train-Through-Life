import React, { Component } from "react";
import Profile from "./profile/Profile";
import Notifications from "./notifications/Notifications";
import TrainerList from "./trainers/TrainerList";

class Dashboard extends Component {
  state = {
    trainers: [
      {
        id: 1,
        first_name: "Claudio ",
        last_name: "Ruiz",
        description:
          "Cześć jestem Claudio ! Jestem trenerem personalnym od 7 lat. Zajmuję się profesjonalnym treningiem cardio oraz cross-fit. Dużą wagę przywiązuję do jakości przeprowadzanych zajęć, co pozytywnie przekłada się na zainteresowanie ćwiczących.",
        photo:
          "https://images.pexels.com/photos/733500/pexels-photo-733500.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      },
      {
        id: 2,
        first_name: "Claudio ",
        last_name: "Ruiz",
        description:
          "Cześć jestem Claudio ! Jestem trenerem personalnym od 7 lat. Zajmuję się profesjonalnym treningiem cardio oraz cross-fit. Dużą wagę przywiązuję do jakości przeprowadzanych zajęć, co pozytywnie przekłada się na zainteresowanie ćwiczących.",
        photo:
          "https://images.pexels.com/photos/733500/pexels-photo-733500.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      }
    ]
  };
  render() {
    const { trainers } = this.state;
    return (
      <div className="container" style={dashboardContainerStyle}>
        <div className="row">
          <Profile />
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

export default Dashboard;
