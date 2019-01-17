import React from "react";

const Buttons = props => {
  const { prevStep, nextStep, onFormSubmit, step } = props;

  if (step === 1) {
    return (
      <button className="btn" onClick={nextStep} style={buttonStyle}>
        Dalej
        <i className="material-icons right">navigate_next</i>
      </button>
    );
  } else if (step === 2) {
    return (
      <React.Fragment>
        <button className="btn" onClick={prevStep} style={buttonStyle}>
          Powrót
          <i className="material-icons left">navigate_before</i>
        </button>
        <button className="btn" onClick={nextStep} style={buttonStyle}>
          Dalej
          <i className="material-icons right">navigate_next</i>
        </button>
      </React.Fragment>
    );
  } else if (step === 3) {
    return (
      <React.Fragment>
        <button className="btn" onClick={prevStep} style={buttonStyle}>
          Powrót
          <i className="material-icons left">navigate_before</i>
        </button>
        <button
          className="btn"
          onClick={e => onFormSubmit(e)}
          style={buttonStyle}
        >
          Zarejestruj
          <i className="material-icons right">navigate_next</i>
        </button>
      </React.Fragment>
    );
  }
};
const buttonStyle = {
  margin: "0px 5px 5px 5px"
};
export default Buttons;
