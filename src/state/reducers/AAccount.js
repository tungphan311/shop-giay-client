export const ADD_ACCOUNT = "aAccount/ADD_ACCOUNT";
export const GET_ALL_ACCOUNT = "aAccount/GET_ALL_ACCOUNT";
export const GET_ALL_ACCOUNT_SUCCESS = "aAccount/GET_ALL_ACCOUNT_SUCCESS";

const initState = {
  accounts: [],
};

export function AAccountReducer(state = initState, action = {}) {
  const newState = { ...state };
  switch (action.type) {
    case GET_ALL_ACCOUNT_SUCCESS: {
      newState.accounts = action.response;
      return newState;
    }
    default:
      return newState;
  }
}
