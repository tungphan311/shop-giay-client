import { TOKEN_KEY } from "constants/index";
const initState = {
  username: null,
};

export const ACTION_LOGIN = "auth/LOGIN";
export const ACTION_LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
export const ACTION_LOGIN_FAIL = "auth/LOGIN_FAIL";
export const ACTION_LOGOUT = "auth/LOGOUT";
export const ACTION_LOGOUT_SUCCESS = "auth/LOGOUT_SUCCESS";
export const ACTION_FORCE_LOGOUT = "auth/FORCE_LOGOUT";

export const cAuthReducer = (state = initState, action = {}) => {
  const newState = { ...state };
  switch (action.type) {
    case ACTION_LOGIN_SUCCESS:
      const { token, username } = action.payload;
      newState.username = username;
      localStorage.setItem(TOKEN_KEY, token);
      return newState;
    case ACTION_LOGIN_FAIL:
      newState.username = null;
      return newState;
    case ACTION_LOGOUT_SUCCESS:
      localStorage.removeItem(TOKEN_KEY);
      newState.username = null;
      return newState;
    case ACTION_FORCE_LOGOUT:
      localStorage.removeItem(TOKEN_KEY);
      newState.username = null;
    default:
      return newState;
  }
};
