import {
  ADD_TRAINER,
  ADD_USER,
  ADD_USER_ERROR,
  EDIT_PROFILE,
  EDIT_PROFILE_ERROR,
  EDIT_DESCRIPTION,
  EDIT_DESCRIPTION_ERROR,
  EDIT_CLASSES,
  EDIT_CLASSES_ERROR
} from "../types";

const initState = {
  users: [
    {
      id: 1,
      first_name: "kot",
      last_name: "pies",
      email: "kot@gmail.com",
      phone: "1122334455",
      password: "kotkot",
      city: "Wroclaw",
      trainer: false,
      user: true,
      photo:
        "https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    {
      id: 2,
      first_name: "Alicja",
      last_name: "Janosz",
      email: "ala@gmail.com",
      phone: "99887766",
      password: "ala",
      city: "Wroclaw",
      trainer: false,
      user: true,
      photo:
        "https://images.pexels.com/photos/1533897/pexels-photo-1533897.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    }
  ],
  trainers: [
    {
      id: 3,
      first_name: "Claudio ",
      last_name: "Ruiz",
      email: "claudio@gmail.com",
      phone: "111222333",
      password: "kotek321",
      city: "Wroclaw",
      trainer: true,
      user: false,
      description:
        "Cześć jestem Claudio ! Jestem trenerem personalnym od 7 lat. Zajmuję się profesjonalnym treningiem cardio oraz CrossFit. Dużą wagę przywiązuję do jakości przeprowadzanych zajęć, co pozytywnie przekłada się na zainteresowanie ćwiczących.",
      photo:
        "https://images.pexels.com/photos/733500/pexels-photo-733500.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      // classes: ["Cardio", "Cross-Fit"],
      classes: [
        { name: "Cardio", cost: 30 },
        { name: "CrossFit", cost: 50 },
        { name: "Taekwondo", cost: 10 }
      ]
    },
    {
      id: 4,
      first_name: "Alina",
      last_name: "Czubatka",
      email: "alina@gmail.com",
      phone: "333444555",
      password: "muszuking",
      city: "Wroclaw",
      trainer: true,
      user: false,
      photo:
        "https://images.pexels.com/photos/136405/pexels-photo-136405.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      description:
        "Cześć jestem Alina ! Dużą wagę przywiązuję do jakości przeprowadzanych zajęć, co pozytywnie przekłada się na zainteresowanie ćwiczących.",
      classes: [
        { name: "Cardio", cost: 30 },
        { name: "CrossFit", cost: 50 },
        { name: "Box", cost: 45 }
      ]
    }
  ]
};

export default (state = initState, action) => {
  const user = action.user;
  const authError = action.authError;
  switch (action.type) {
    case ADD_USER:
      const users = [...state.users, user];

      return { ...state, users, authError: null };
    case ADD_USER_ERROR:
      return { ...state, authError };
    case ADD_TRAINER:
      const trainers = [...state.trainers, user];

      return { ...state, trainers, authError: null };
    case EDIT_PROFILE:
      return state;
    case EDIT_PROFILE_ERROR:
      return state;
    case EDIT_DESCRIPTION:
      return state;
    case EDIT_DESCRIPTION_ERROR:
      return state;
    case EDIT_CLASSES:
      return state;
    case EDIT_CLASSES_ERROR:
      return state;
    default:
      return state;
  }
};
