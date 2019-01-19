import React, { Component } from "react";

import SignUpStepOne from "./signUpForm/SignUpStepOne";
import SignUpStepTwo from "./signUpForm/SignUpStepTwo";
import SignUpSummary from "./signUpForm/SignUpSummary";
import FormSteps from "./signUpForm/FormSteps";
import Buttons from "./signUpForm/Buttons";

import addUser from "../../store/actions/addUser";
import { connect } from "react-redux";

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

  redirectToStep = step =>
    // redirects  to clicked step in signUp form
    this.setState({
      step
    });

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
      // checkboxes radio buttons mechanic imitaion
      e.target.id === "trainer"
        ? (personData.user = !this.state.personData.user)
        : (personData.trainer = !this.state.personData.trainer);

      this.setState({ personData });
    } else {
      this.setState({ personData });
    }
  };

  onFormSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.addUser(this.state.personData);
    this.props.history.push("/");
  };

  renderForm = () => {
    const { personData } = this.state;
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
          user
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
          <SignUpSummary personData={personData} onFormSubmit={onFormSubmit} />
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
      onFormSubmit,
      redirectToStep
    } = this;
    return (
      <div className="container center-align">
        <div className="row">
          <FormSteps step={step} redirectToStep={redirectToStep} />
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

const mapStateToProps = state => {
  return {
    users: state.users
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addUser: user => dispatch(addUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
