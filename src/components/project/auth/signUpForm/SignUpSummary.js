import React, { Component } from "react";

class SignUpSummary extends Component {
  state = {
    empty: false,
    fieldsToFill: []
  };

  checkForEmptyFields = () => {
    let empty = false;
    let oldArray = this.state.fieldsToFill;
    // form check
    for (let i in this.props.personData) {
      if (i !== "photo" && (i !== "phone" && this.props.personData[i] === "")) {
        empty = true;
        oldArray = [...oldArray, i];
        // password length check
      }
      if (i === "password" && this.props.personData[i].length < 6) {
        empty = true;
      }

      this.setState({ fieldsToFill: oldArray });
    }
    this.setState({ empty });
  };

  componentDidMount() {
    this.checkForEmptyFields();
  }

  render() {
    const {
      personData: {
        first_name,
        last_name,
        email,
        phone,
        password,
        city,
        trainer
      },
      onFormSubmit
    } = this.props;

    const { empty, fieldsToFill } = this.state;

    return (
      <form
        onSubmit={() => {
          onFormSubmit();
        }}
      >
        <h3>Podsumowanie</h3>
        <div className="row">
          <div className="input-field col s12">
            <input
              disabled
              value={first_name}
              id="disabled"
              type="text"
              className="validate"
              required
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
              required
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
              required
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
              required
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
              required
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
              required
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
            required
          />
          <label htmlFor="disabled" className="active">
            Your Role:
          </label>
        </div>
        {empty || password.length < 6 ? (
          <React.Fragment>
            <h5 className="red-text text-lighten-1">
              Uzupełnij następujące pola wymagane:
            </h5>
            {password.length < 6 ? (
              <h6 className="red-text text-lighten-1">
                Pamiętaj, że hasło powinno mieć conajmniej 6 znaków
              </h6>
            ) : null}
            <ul>
              {fieldsToFill.map(field => (
                <li key={field}>{field}</li>
              ))}
            </ul>
          </React.Fragment>
        ) : null}
      </form>
    );
  }
}

export default SignUpSummary;
