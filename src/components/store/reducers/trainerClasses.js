// import { ADD_TRAINING } from "../types";
const initState = {
  trainerClasses: [
    { name: "Crossfit", cost: 40 },
    { name: "Cardio", cost: 30 },
    { name: "Taekwondo", cost: 70 }
  ]
};

export default (state = initState, action) => {
  // console.log(action.training);
  // console.log(state);
  // const training = action.training;
  // switch (action.type) {
  //   case ADD_TRAINING:
  //     console.log("tak");
  //     return { ...state, training };
  //   default:
  //     console.log("nie");
  //     return state;
  // }
  return state;
};
