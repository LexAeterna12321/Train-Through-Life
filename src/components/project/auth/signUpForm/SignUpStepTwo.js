import React from "react";

const SignUpStepTwo = props => {
  const { onInputChange, password, city, trainer, user } = props;

  const checkboxes = (
    <React.Fragment>
      <p>
        <label className="left-align">
          <input
            id="user"
            type="checkbox"
            onChange={onInputChange}
            checked={user}
          />
          <span>User</span>
        </label>
      </p>
      <p>
        <label className="left-align">
          <input
            id="trainer"
            type="checkbox"
            onChange={onInputChange}
            checked={trainer}
          />
          <span>Trainer</span>
        </label>
      </p>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <h2> Rejestracja </h2>
      <h6>Zarejestruj się w aplikacji wypełniając poniższe pola</h6>
      <form className="col s12">
        <div className="row">
          <div className="input-field col s10 m6">
            {" "}
            <i className="material-icons prefix">vpn_key</i>
            <input
              id="password"
              type="password"
              className="validate"
              onChange={onInputChange}
              value={password}
            />
            <label htmlFor="password" className="active">
              Create Password
            </label>
          </div>
          <div className="input-field col s10 m6">
            {" "}
            <i className="material-icons prefix">location_city</i>
            <input
              id="city"
              type="text"
              className="validate"
              onChange={onInputChange}
              value={city}
            />
            <label htmlFor="city" className="active">
              City
            </label>
          </div>
          <div className="input-field col s10 m6">
            {" "}
            <i className="material-icons prefix">add_a_photo</i>
            <input
              id="photo"
              type="email"
              className="validate"
              onChange={onInputChange}
              //
              disabled
            />
            <label htmlFor="photo" className="active">
              Add profile image
            </label>
          </div>
          <div className="input-field col s10 m6" style={checkboxesStyle}>
            <span>Wybierz swoją rolę:</span>
            {checkboxes}
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};
const checkboxesStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center"
};

export default SignUpStepTwo;
