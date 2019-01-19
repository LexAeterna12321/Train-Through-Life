import React from "react";
import { Link } from "react-router-dom";

const TrainerDetail = props => {
  const { first_name, last_name, photo, description, classes } = props.trainer;
  const randClassTypeId = () => Math.random();

  return (
    <div className="col s12  center-align">
      <div className="card">
        <div className="card-image">
          <img src={`${photo}`} alt="trainer-avatar" />
          <span className="card-title black-text">
            {first_name} {last_name}
          </span>
          <Link
            to="/addTraining/:trainerId"
            className="btn-floating halfway-fab waves-effect waves-light red right"
          >
            <i className="material-icons">alarm_add</i>
          </Link>
        </div>
        <div className="card-content left-align">
          <p>{description}</p>
        </div>
        <div className="card-content left-align">
          <p>
            Zajęcia:{" "}
            {classes.map(classType => {
              return <span key={randClassTypeId()}>{classType.type}, </span>;
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetail;
