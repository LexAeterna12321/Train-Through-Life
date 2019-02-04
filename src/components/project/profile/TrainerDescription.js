import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import editTrainerDescription from "../../store/actions/editTrainerDescription";

import { Link } from "react-router-dom";

class TrainerDescription extends Component {
  state = { description: "" };

  descUpdate = e => {
    this.setState({ description: e.currentTarget.value });
  };

  renderDescription = () => {
    const { description: oldDescription } = this.props;
    const { description: newDescription } = this.state;
    return oldDescription ? (
      <textarea
        style={textAreaStyle}
        onChange={this.descUpdate}
        defaultValue={oldDescription}
      />
    ) : (
      <textarea
        style={textAreaStyle}
        onChange={this.descUpdate}
        value={newDescription ? newDescription : ""}
        placeholder="Dodaj swój opis"
      />
    );
  };

  changeDesc = () => {
    const profileId = this.props.match.params.profileId;
    this.props.editDescription(this.state.description, profileId);
    this.props.history.push(`/dashboard/${profileId}`);
  };

  render() {
    const profileId = this.props.match.params.profileId;
    return (
      <div className="container">
        <h5 className="center">Zarządzanie Opisem</h5>
        <div className="row">
          <h6 className="center">Twój opis:</h6>
          <div className="col s12 center-align ">
            {this.renderDescription()}
            <div>
              <Link
                to={`/dashboard/${profileId}`}
                className="btn"
                style={buttonsStyle}
              >
                Powrót
              </Link>
              <button
                className="btn"
                style={buttonsStyle}
                onClick={() => this.changeDesc()}
              >
                Zatwierdź
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const buttonsStyle = {
  margin: "0 5px"
};
const textAreaStyle = {
  width: "90%",
  height: "50vh",
  margin: "0 auto"
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.profileId;

  const description = state.firestore.data.trainers
    ? state.firestore.data.trainers[id].description
    : null;

  return {
    description
  };
};
const mapDispatchToProps = dispatch => {
  return {
    editDescription: (description, profileId) => {
      dispatch(editTrainerDescription(description, profileId));
    }
  };
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "trainers" }])
)(TrainerDescription);
