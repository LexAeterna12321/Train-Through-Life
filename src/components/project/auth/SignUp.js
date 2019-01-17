import React, { Component } from "react";
import SignUpStepOne from "./signUpForm/SignUpStepOne";
import SignUpStepTwo from "./signUpForm/SignUpStepTwo";
import SignUpSummary from "./signUpForm/SignUpSummary";

class SignUp extends Component {
  state = {
    step: 1,
    personData: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      city: "",
      trainer: false,
      user: true,
      photo: ""
    }
  };

  prevStep = () => {
    this.setState({
      step: this.state.step - 1
    });
  };

  nextStep = () => {
    this.setState({
      step: this.state.step + 1
    });
  };

  onInputChange = e => {
    const personData = {
      ...this.state.personData,
      [e.target.id]: e.target.value
    };
    // valid values in checkboxes obtained from e.target.checked, not value.
    if (e.target.id === "trainer" || e.target.id === "user") {
      const personData = {
        ...this.state.personData,
        [e.target.id]: e.target.checked
      };
      this.setState({ personData });
    } else {
      this.setState({ personData });
    }
  };

  onFormSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.history.push("/");
  };

  renderButtons = () => {
    const {
      prevStep,
      nextStep,
      onFormSubmit,
      state: { step }
    } = this;

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
          <button className="btn" onClick={onFormSubmit} style={buttonStyle}>
            Zarejestruj
            <i className="material-icons right">navigate_next</i>
          </button>
        </React.Fragment>
      );
    }
  };

  renderForm = () => {
    const {
      onInputChange,
      state: {
        step,
        personData: {
          first_name,
          last_name,
          email,
          phone,
          password,
          city,
          trainer,
          user,
          photo
        }
      }
    } = this;

    switch (step) {
      //
      case 1:
        return (
          <SignUpStepOne
            onInputChange={onInputChange}
            first_name={first_name}
            last_name={last_name}
            email={email}
            phone={phone}
          />
        );
      //
      case 2: {
        return (
          <SignUpStepTwo
            onInputChange={onInputChange}
            password={password}
            city={city}
            trainer={trainer}
            user={user}
          />
        );
      }
      //
      case 3: {
        return (
          <SignUpSummary
            first_name={first_name}
            last_name={last_name}
            email={email}
            phone={phone}
            password={password}
            city={city}
            trainer={trainer}
            user={user}
            photo={photo}
          />
        );
      }
      default:
        return null;
    }
  };

  renderSteps = () => {
    switch (this.state.step) {
      case 1:
        return (
          <nav className="teal lighten-1 hide-on-small-only">
            <div className="nav-wrapper">
              <div className="col s12">
                <span className="breadcrumb">Krok pierwszy</span>
              </div>
            </div>
          </nav>
        );
      case 2:
        return (
          <nav className="teal lighten-1 hide-on-small-only">
            <div className="nav-wrapper">
              <div className="col s12">
                <span className="breadcrumb">Krok pierwszy</span>
                <span className="breadcrumb">Krok drugi</span>
              </div>
            </div>
          </nav>
        );
      case 3:
        return (
          <nav className="teal lighten-1 hide-on-small-only">
            <div className="nav-wrapper">
              <div className="col s12">
                <span className="breadcrumb">Krok pierwszy</span>{" "}
                <span className="breadcrumb">Krok drugi</span>
                <span className="breadcrumb">Podsumowanie</span>
              </div>
            </div>
          </nav>
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="container center-align">
        <div className="row">
          {this.renderSteps()}
          {this.renderForm()}
          {this.renderButtons()}
        </div>
      </div>
    );
  }
}

const buttonStyle = {
  margin: "0px 5px 5px 5px"
};

export default SignUp;
