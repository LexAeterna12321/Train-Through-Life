import React from "react";
import TrainerDetail from "../trainers/TrainerDetail";

const TrainerList = ({ trainers, userId, userCity }) => {
  return (
    <div className="card col s12 m8 l3 offset-m2 offset-l1 kot">
      <h5 className="center" style={headerStyle}>
        Oferty Trenerów z Twojego Miasta
      </h5>
      {/* filters trainers by user's city  */}
      {trainers ? (
        trainers
          .filter(trainer => trainer.city === userCity)
          .map(trainer => {
            return (
              <TrainerDetail
                key={trainer.id}
                trainer={trainer}
                userId={userId}
              />
            );
          })
      ) : (
        <h6>Ładuję listę trenerów</h6>
      )}
    </div>
  );
};

const headerStyle = { margin: "10px 0" };
export default TrainerList;
