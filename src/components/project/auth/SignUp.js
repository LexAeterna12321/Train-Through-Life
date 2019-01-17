import React, { Component } from "react";

import SignUpStepOne from "./signUpForm/SignUpStepOne";
import SignUpStepTwo from "./signUpForm/SignUpStepTwo";
import SignUpSummary from "./signUpForm/SignUpSummary";
import FormSteps from "./signUpForm/FormSteps";
import Buttons from "./signUpForm/Buttons";

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

  renderForm = () => {
    const {
      onInputChange,
      state: {
        step,
        onFormSubmit,
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
            onFormSubmit={onFormSubmit}
          />
        );
      }
      default:
        return null;
    }
  };

  render() {
    const {
      state: { step },
      prevStep,
      nextStep,
      onFormSubmit
    } = this;
    return (
      <div className="container center-align">
        <div className="row">
          <FormSteps step={step} />
          {this.renderForm()}
          <Buttons
            step={step}
            prevStep={prevStep}
            nextStep={nextStep}
            onFormSubmit={onFormSubmit}
          />
        </div>
      </div>
    );
  }
}

export default SignUp;
