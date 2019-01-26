import React from "react";

const Notification = props => {
  console.log({ props });
  return (
    <li style={notificationStyle}>
      <h5>Umówiono spotkanie z Claudio Ruiz!</h5>
      <p>
        Status: <span style={trainingApprovedStyle}>"potwierdzone"</span>
        <i className="material-icons right" style={trainingApprovedStyle}>
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
  );
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

export default Notification;

{
  /* <li style={notificationStyle}>
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
              </li> */
}
