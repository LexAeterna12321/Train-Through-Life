import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import Loader from "../Loader";

class EditTraining extends Component {
  state = { trainingStatus: "approved" };

  onInputChange = e => {
    this.setState({ trainingStatus: [e.target.id] });
  };

  // populate component with data, apply switch function to checkboxes, or try buttons. Migrate profiles to auth collection
  render() {
    const checkboxes = (
      <React.Fragment>
        <p>
          <label className="left-align">
            <input
              id="approved"
              type="checkbox"
              onChange={this.onInputChange}
              onClick={this.onInputChange}
            />
            <span className="green-text">Potwierdź Trening</span>
          </label>
        </p>
        <p>
          <label className="left-align">
            <input
              className="red-text"
              id="canceled"
              type="checkbox"
              onChange={this.onInputChange}
            />
            <span className="red-text">Anuluj Trening</span>
          </label>
        </p>
      </React.Fragment>
    );

    const { notification, first_name, last_name } = this.props;

    if (!notification) return <Loader />;
    else {
      return (
        <div className="container">
          <h3 className="center">Edytuj trening</h3>
          <h6 className="center">
            Trening wysłany od użytkownika {first_name} {last_name}
          </h6>
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s6">
                  <input
                    placeholder="Placeholder"
                    id="first_name"
                    type="text"
                    className="validate"
                  />
                  <label htmlFor="first_name">First Name</label>
                </div>
                <div className="input-field col s6">
                  <input id="last_name" type="text" className="validate" />
                  <label htmlFor="last_name">Last Name</label>
                </div>
                <div className="input-field col s10 m6" style={checkboxesStyle}>
                  <span>Wybierz swoją rolę:</span>
                  {checkboxes}
                </div>
              </div>
              <button className="btn">Zatwierdź wybór</button>
            </form>
          </div>
        </div>
      );
    }
  }
}

const checkboxesStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center"
};

const mapStateToProps = (state, ownProps) => {
  if (state.firestore.ordered.notifications) {
    const trainingId = ownProps.match.params.trainingId;
    const notifications = state.firestore.ordered.notifications
      ? state.firestore.ordered.notifications
      : [];
    const notification = notifications.filter(
      notifi => trainingId === notifi.id
    );
    console.log({ notification });
    console.log({ state });

    const userId = notification[0].info.userId;
    console.log({ userId });
    const first_name = userId
      ? state.firestore.data.users[userId].first_name
      : null;
    const last_name = userId
      ? state.firestore.data.users[userId].last_name
      : null;
    return {
      notification,
      first_name,
      last_name
    };
  } else return {};
};

const mapDispatchToProps = dispatch => {
  // editTraining dodać
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "notifications" }, { collection: "users" }])
)(EditTraining);
