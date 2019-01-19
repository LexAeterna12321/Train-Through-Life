import React, { Component } from "react";

class Notifications extends Component {
  // przerobić notyfikacje z rozbiciem na pojedyńczy element. Trzy fazy umawiania spotkań akceptacja, oczekiwanie, anulowanie. W zależności od fazy różne style użyte w notyfikacji
  state = {
    notifications: []
  };
  render() {
    return (
      <div className="card col s12 m8 l3 offset-m2 offset-l1">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <h5 className="card-title center" style={headerStyle}>
              Twoje Ostatnie Aktywności
            </h5>
            <ul>
              <li style={notificationStyle}>
                <h5>Umówiono spotkanie z Claudio Ruiz!</h5>
                <p>
                  Status:{" "}
                  <span style={trainingApprovedStyle}>"potwierdzone"</span>
                  <i
                    className="material-icons right"
                    style={trainingApprovedStyle}
                  >
                    alarm_on
                  </i>
                </p>
                <p>
                  Data: <span style={trainingApprovedStyle}>20 maj 2019r</span>
                </p>
                <p>
                  Typ zajęć: <span style={trainingApprovedStyle}>CrossFit</span>
                </p>
                <p>
                  Koszt / Czas Trwania:{" "}
                  <span style={trainingApprovedStyle}>75 zł / 2,5h</span>
                </p>
              </li>
              <li style={notificationStyle}>
                <h5>Wysłano ofertę spotkania z Claudio Ruiz!</h5>
                <p>
                  Status:{" "}
                  <span style={trainingPendingStyle}>
                    "czeka na potwierdzenie"
                  </span>
                  <i
                    className="material-icons right"
                    style={trainingPendingStyle}
                  >
                    alarm
                  </i>
                </p>
                <p>
                  Data: <span style={trainingPendingStyle}>20 maj 2019r</span>
                </p>
                <p>
                  Typ zajęć: <span style={trainingPendingStyle}>CrossFit</span>
                </p>
                <p>
                  Koszt / Czas Trwania:{" "}
                  <span style={trainingPendingStyle}>75 zł / 2,5h</span>
                </p>
              </li>{" "}
              <li style={notificationStyle}>
                <h5>Odwołano spotkanie z Claudio Ruiz!</h5>
                <p>
                  Status:{" "}
                  <span style={trainingCanceledStyle}>
                    "anulowane przez trenera"
                  </span>
                  <i
                    className="material-icons right"
                    style={trainingCanceledStyle}
                  >
                    alarm_off
                  </i>
                </p>
                <p>
                  Data: <span style={trainingCanceledStyle}>20 maj 2019r</span>
                </p>
                <p>
                  Typ zajęć: <span style={trainingCanceledStyle}>CrossFit</span>
                </p>
                <p>
                  Koszt / Czas Trwania:{" "}
                  <span style={trainingCanceledStyle}>75 zł / 2,5h</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
const headerStyle = { margin: "10px 0" };

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

export default Notifications;
