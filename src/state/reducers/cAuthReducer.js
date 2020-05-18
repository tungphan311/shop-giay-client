import { TOKEN_KEY } from "constants/index";
import JwtDecoder from "../../utils/JwtDecoder";
const initState = {
  username: null,
  userInfo: null,
};

export const ACTION_LOGIN = "auth/LOGIN";
export const ACTION_LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
export const ACTION_LOGIN_FAIL = "auth/LOGIN_FAIL";
export const ACTION_LOGOUT = "auth/LOGOUT";
export const ACTION_LOGOUT_SUCCESS = "auth/LOGOUT_SUCCESS";
export const ACTION_FORCE_LOGOUT = "auth/FORCE_LOGOUT";
export const ACTION_VERIFY_TOKEN = "auth/VERIFY_TOKEN";
export const ACTION_VERIFY_TOKEN_SUCCESS = "auth/VERIFY_TOKEN_SUCCESS";
export const ACTION_VERIFY_TOKEN_FAIl = "auth/VERIFY_TOKEN_FAIL";

export const cAuthReducer = (state = initState, action = {}) => {
  const newState = { ...state };
  switch (action.type) {
    case ACTION_LOGIN_SUCCESS: {
      const { token, username } = action.payload;
      newState.username = username;
      localStorage.setItem(TOKEN_KEY, token);
      return newState;
    }
    case ACTION_LOGIN_FAIL:
      newState.username = null;
      newState.userInfo = null;
      return newState;
    case ACTION_LOGOUT_SUCCESS:
      localStorage.removeItem(TOKEN_KEY);
      newState.username = null;
      newState.userInfo = null;
      return newState;
    case ACTION_FORCE_LOGOUT:
      localStorage.removeItem(TOKEN_KEY);
      newState.username = null;
      newState.userInfo = null;
      return newState;
    case ACTION_VERIFY_TOKEN_SUCCESS: {
      const { token, userInfo } = action.payload;
      const { sub } = JwtDecoder(token);
      newState.username = sub;
      newState.userInfo = userInfo;
      return newState;
    }
    case ACTION_VERIFY_TOKEN_FAIl:
      localStorage.removeItem(TOKEN_KEY);
      newState.username = null;
      newState.userInfo = null;
      return newState;
    default:
      return newState;
  }
};
