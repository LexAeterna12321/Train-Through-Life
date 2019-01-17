import React, { Component } from "react";

class SignInTrainer extends Component {
  state = {
    email: "",
    password: ""
  };

  onInputChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <div style={bgStyle}>
        <div className="container white-text">
          <h2 style={{ paddingTop: "25px" }}>Zaloguj się jako Trener</h2>
          <div className="row">
            <form className="col s12" onSubmit={this.onFormSubmit}>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="email"
                    type="email"
                    className="validate white-text"
                    value={this.state.email}
                    onChange={this.onInputChange}
                  />
                  <label htmlFor="email">Email</label>
                  <span
                    className="helper-text white-text"
                    data-error=""
                    data-success=""
                  >
                    Wpisz swój adres email podany przy rejestracji konta.
                  </span>
                </div>

                <div className="input-field col s12">
                  <input
                    id="password"
                    type="text"
                    className="validate white-text"
                    value={this.state.password}
                    onChange={this.onInputChange}
                  />
                  <label htmlFor="password">Password</label>
                  <span
                    className="helper-text white-text"
                    data-error=""
                    data-success=""
                  >
                    Wpisz swoje hasło podane przy rejestracji konta.
                  </span>
                </div>
              </div>
              <button className="btn">Zaloguj</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const bgStyle = {
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.2)), url(https://images.pexels.com/photos/685534/pexels-photo-685534.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
  position: "relative",
  top: "-36px",
  left: "0",
  width: "100%",
  height: "100vh",
  margin: "0",
  padding: "0",
  backgroundPosition: "center",
  backgroundSize: "cover"
};

export default SignInTrainer;
