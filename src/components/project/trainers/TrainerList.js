import React from "react";
import TrainerDetail from "../trainers/TrainerDetail";

const TrainerList = ({ trainers }) => {
  return (
    <div className="card col s12 m8 l3 offset-m2 offset-l1 kot">
      <h5 className="center" style={headerStyle}>
        Oferty Trenerów z Twojego Miasta
      </h5>

      {trainers.map(trainer => {
        return <TrainerDetail key={trainer.id} trainer={trainer} />;
      })}
    </div>
  );
};

const headerStyle = { margin: "10px 0" };
export default TrainerList;
