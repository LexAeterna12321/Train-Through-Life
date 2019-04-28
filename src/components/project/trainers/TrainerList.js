import React from "react";
import TrainerDetail from "../trainers/TrainerDetail";

const formatToUniversalString = unformatedString => {
  const formatedString = unformatedString
    .toLowerCase()
    .replace(/żź/gi, "z")
    .replace(/ł/gi, "l")
    .replace(/ó/gi, "o")
    .trim();
  return formatedString;
};

const TrainerList = ({ trainers, userId, userCity }) => {
  const checkForMatchingTrainers = () =>
    matchTrainersByCity().length > 0 ? true : false;

  const matchTrainersByCity = () => {
    return trainers.filter(trainer => {
      const trainerC = formatToUniversalString(trainer.city);
      const userC = formatToUniversalString(userCity);
      return trainerC === userC;
    });
  };

  const matchedTrainers = [...matchTrainersByCity()];

  const renderTrainersList = trainers => {
    return trainers.map(trainer => (
      <TrainerDetail key={trainer.id} trainer={trainer} userId={userId} />
    ));
  };

  return (
    <div className="card col s12 m8 l3 offset-m2 offset-l1">
      <h5 className="center" style={headerStyle}>
        Oferty Trenerów z Twojego Miasta
      </h5>
      {checkForMatchingTrainers() ? (
        renderTrainersList(matchedTrainers)
      ) : (
        <h5 className="center red-text text-lighten-2">
          Brak zarejestrowanych trenerów w Twoim mieście. Spróbuj wyszukiwania w
          innym mieście.
        </h5>
      )}
    </div>
  );
};

const headerStyle = { margin: "10px 0" };
export default TrainerList;
