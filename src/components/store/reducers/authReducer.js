import { LOGIN_SUCCESS, LOGIN_ERROR } from "../types";
import { SIGNOUT_SUCCESS, SIGNOUT_ERROR } from "../types";
const initState = {
  authError: null
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
      return {
        ...state,
        authError: "Błąd logowania. Wprowadź prawidłowe dane"
      };
    case LOGIN_SUCCESS:
      return { ...state, authError: null };
    case SIGNOUT_SUCCESS:
      return state;
    case SIGNOUT_ERROR:
      return state;
    default:
      return state;
  }
};
