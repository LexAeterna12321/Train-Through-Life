import { LOGIN_SUCCESS, LOGIN_ERROR } from "../types";
import { SIGNOUT_SUCCESS, SIGNOUT_ERROR } from "../types";
const initState = {
  authError: null
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
      console.log("login error");
      return {
        ...state,
        authError: "Błąd logowania. Wprowadź prawidłowe dane"
      };
    case LOGIN_SUCCESS:
      console.log("login works");
      return { ...state, authError: null };
    case SIGNOUT_SUCCESS:
      console.log("signout success");
      return state;
    case SIGNOUT_ERROR:
      console.log("signout error", action.err);
      return state;
    default:
      return state;
  }
};
