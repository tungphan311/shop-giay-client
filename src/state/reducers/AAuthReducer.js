// eslint-disable-next-line no-unused-vars
import jwt_decode from "jwt-decode";

export const LOGIN = "aAuth/LOGIN";
export const LOGIN_SUCCESS = "aAuth/LOGIN_SUCCESS";

export const LOGOUT = "aAuth/LOGOUT";
export const LOGOUT_SUCCESS = "aAuth/LOGOUT_SUCCESS";

export const INIT_DATA = "aAuth/INIT_DATA";

const initState = {
  token: null,
};

export function AAuthReducer(state = initState, action = {}) {
  const newState = { ...state };

  switch (action.type) {
    case LOGIN_SUCCESS: {
      let { token } = action.response;

      newState.token = token;
      return newState;
    }

    case INIT_DATA: {
      let { token } = action;
      token = token.substring(1, token.length - 1);

      newState.token = token;
      return newState;
    }

    case LOGOUT_SUCCESS:
      return initState;

    default:
      return newState;
  }
}
