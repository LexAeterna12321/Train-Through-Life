import React from "react";

const SignUpStepOne = props => {
  const { onInputChange, first_name, last_name, email, phone } = props;

  return (
    <React.Fragment>
      <h3> Rejestracja </h3>
      <h6>Zarejestruj się w aplikacji wypełniając poniższe pola</h6>
      <form className="col s12">
        <div className="row">
          <div className="input-field col s10 m6">
            {" "}
            <i className="material-icons prefix">account_circle</i>
            <input
              id="first_name"
              type="text"
              className="validate"
              onChange={onInputChange}
              value={first_name}
            />
            <label className="active" htmlFor="first_name">
              First Name
            </label>
          </div>
          <div className="input-field col s10 m6">
            {" "}
            <i className="material-icons prefix">account_circle</i>
            <input
              id="last_name"
              type="text"
              className="validate"
              onChange={onInputChange}
              value={last_name}
            />
            <label className="active" htmlFor="last_name">
              Last Name
            </label>
          </div>
          <div className="input-field col s10 m6">
            {" "}
            <i className="material-icons prefix">email</i>
            <input
              id="email"
              type="email"
              className="validate"
              onChange={onInputChange}
              value={email}
            />
            <label className="active" htmlFor="email">
              Email
            </label>
          </div>
          <div className="input-field col s10 m6">
            {" "}
            <i className="material-icons prefix">phone</i>
            <input
              id="phone"
              type="text"
              pattern="[0-9]{9}"
              placeholder="Opcjonalne. 9 cyfr"
              className="validate"
              onChange={onInputChange}
              value={phone}
            />
            <label className="active" htmlFor="phone">
              Phone number
            </label>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default SignUpStepOne;
