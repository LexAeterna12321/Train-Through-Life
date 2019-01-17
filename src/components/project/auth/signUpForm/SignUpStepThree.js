import React from "react";

const SignUpStepThree = props => {
  const {
    first_name,
    last_name,
    email,
    phone,
    password,
    city,
    trainer
  } = props;
  return (
    <form>
      <h2>Podsumowanie Rejestracji</h2>
      <div className="row">
        <div className="input-field col s12">
          <input
            disabled
            value={first_name}
            id="disabled"
            type="text"
            className="validate"
          />
          <label htmlFor="disabled" className="active">
            First Name
          </label>
        </div>
        <div className="input-field col s12">
          <input
            disabled
            value={last_name}
            id="disabled"
            type="text"
            className="validate"
          />
          <label htmlFor="disabled" className="active">
            Last Name
          </label>
        </div>
        <div className="input-field col s12">
          <input
            disabled
            value={email}
            id="disabled"
            type="text"
            className="validate"
          />
          <label htmlFor="disabled" className="active">
            Email
          </label>
        </div>
        <div className="input-field col s12">
          <input
            disabled
            value={phone}
            id="disabled"
            type="text"
            className="validate"
          />
          <label htmlFor="disabled" className="active">
            Phone
          </label>
        </div>
        <div className="input-field col s12">
          <input
            disabled
            value={password}
            id="disabled"
            type="text"
            className="validate"
          />
          <label htmlFor="disabled" className="active">
            Password
          </label>
        </div>
        <div className="input-field col s12">
          <input
            disabled
            value={city}
            id="disabled"
            type="text"
            className="validate"
          />
          <label htmlFor="disabled" className="active">
            City
          </label>
        </div>
      </div>
      <div className="input-field col s12">
        <input
          disabled
          value={trainer ? "Trainer" : "User"}
          id="disabled"
          type="text"
          className="validate"
        />
        <label htmlFor="disabled" className="active">
          Your Role:
        </label>
      </div>
    </form>
  );
};

export default SignUpStepThree;
