import jwt_decode from "jwt-decode";

export const LOGIN = "aAuth/LOGIN";
export const LOGIN_SUCCESS = "aAuth/LOGIN_SUCCESS";

export const LOGOUT = "aAuth/LOGOUT";
export const LOGOUT_SUCCESS = "aAuth/LOGOUT_SUCCESS";

const initState = {
  token: null,
  //   identity: {},
};

export function AAuthReducer(state = initState, action = {}) {
  const newState = { ...state };

  switch (action.type) {
    case LOGIN_SUCCESS: {
      const { token } = action.response;
      newState.token = token;
      return newState;
    }

    case LOGOUT_SUCCESS:
    default:
      return newState;
  }
}
