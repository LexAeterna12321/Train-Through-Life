import React from "react";

const FormSteps = ({ step, redirectToStep }) => {
  // three steps in three stages signUp form
  switch (step) {
    case 1:
      return (
        <nav className="teal lighten-1 hide-on-small-only">
          <div className="nav-wrapper">
            <div className="col s12">
              <span
                className="breadcrumb"
                onClick={() => redirectToStep(1)}
                style={navStepsStyle}
              >
                Krok pierwszy
              </span>
            </div>
          </div>
        </nav>
      );
    case 2:
      return (
        <nav className="teal lighten-1 hide-on-small-only">
          <div className="nav-wrapper">
            <div className="col s12">
              <span
                className="breadcrumb"
                onClick={() => redirectToStep(1)}
                style={navStepsStyle}
              >
                Krok pierwszy
              </span>
              <span
                className="breadcrumb"
                onClick={() => redirectToStep(2)}
                style={navStepsStyle}
              >
                Krok drugi
              </span>
            </div>
          </div>
        </nav>
      );
    case 3:
      return (
        <nav className="teal lighten-1 hide-on-small-only">
          <div className="nav-wrapper">
            <div className="col s12">
              <span
                className="breadcrumb"
                onClick={() => redirectToStep(1)}
                style={navStepsStyle}
              >
                Krok pierwszy
              </span>
              <span
                className="breadcrumb"
                onClick={() => redirectToStep(2)}
                style={navStepsStyle}
              >
                Krok drugi
              </span>
              <span
                className="breadcrumb"
                onClick={() => redirectToStep(3)}
                style={navStepsStyle}
              >
                Podsumowanie
              </span>
            </div>
          </div>
        </nav>
      );
    default:
      return null;
  }
};
const navStepsStyle = {
  cursor: "pointer"
};

export default FormSteps;
