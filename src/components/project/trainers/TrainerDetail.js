import React, { Component } from "react";
import { Link } from "react-router-dom";
import { storage } from "../../../fbConfig/index";

class TrainerDetail extends Component {
  state = { url: "" };

  componentDidMount() {
    this.getAvatarPhoto();
  }

  getAvatarPhoto = () => {
    const { id } = this.props.trainer;

    // firebase storage
    const storageRef = storage.ref();
    return storageRef
      .child(`avatar_photos/${id}`)
      .getDownloadURL()
      .then(url => {
        this.setState({ url });
      })
      .catch(err => {
        // default photo if no photo provided
        this.setState({ url: "/img/avatar.png" });
      });
  };
  render() {
    const {
      first_name,
      last_name,
      description,
      classes,
      id
    } = this.props.trainer;

    const { url } = this.state;
    const { userId } = this.props;
    const randClassTypeId = () => Math.random();

    return (
      <div className="col s12  center-align">
        <div className="card">
          <div className="card-image">
            <img src={url} alt="trainer-avatar" />
            <span className="card-title black-text" style={trainerNameStyle}>
              {first_name} {last_name}
            </span>
            <Link
              to={`/addTraining/${id}/${userId}`}
              className="btn-floating halfway-fab waves-effect waves-light red right"
            >
              <i className="material-icons">alarm_add</i>
            </Link>
          </div>
          <div className="card-content left-align">
            <p>
              {description ? description : "Trener nie dodał jeszcze opisu"}
            </p>
          </div>
          <div className="card-content left-align">
            <p>
              Zajęcia:{" "}
              {classes
                ? classes.map(classType => {
                    return (
                      <span key={randClassTypeId()}>{classType.name}, </span>
                    );
                  })
                : "Brak dostępnych zajęć"}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const trainerNameStyle = {
  backgroundColor: "rgba(255,255,255,0.5)",
  width: "100%"
};
export default TrainerDetail;
