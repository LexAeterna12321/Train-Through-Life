import { ADD_USER } from "../types";
import { ADD_TRAINER } from "../types";

const initState = {
  users: [
    {
      id: "1",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      city: "",
      trainer: false,
      user: true,
      photo: ""
    }
  ],
  trainers: [
    {
      id: "1",
      first_name: "Alina",
      last_name: "Czubatka",
      email: "alina@gmail.com",
      phone: "",
      password: "",
      city: "",
      trainer: true,
      user: false,
      photo: ""
    }
  ]
};

export default (state = initState, action) => {
  const user = action.user;
  switch (action.type) {
    case ADD_USER:
      console.log("dodano usera");
      const users = [...state.users, user];
      console.log(users);
      return { ...state, users };
    case ADD_TRAINER:
      console.log("dodano trenera");
      const trainers = [...state.trainers, user];
      console.log(trainers);
      return { ...state, trainers };
    default:
      console.log(" nie dodano usera, ani trenera");
      return state;
  }
};
