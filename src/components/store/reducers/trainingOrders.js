import { ADD_TRAINING } from "../types";

const initState = {
  orderedClasses: [{ name: "kot", duration: 0, totalCost: 0 }]
};

export default (state = initState, action) => {
  const training = action.training;
  switch (action.type) {
    case ADD_TRAINING:
      console.log("dodano trening");
      return { ...state, training };
    default:
      console.log("nic nie dodano");
      return state;
  }
};
