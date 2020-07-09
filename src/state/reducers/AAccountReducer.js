export const ADD_ACCOUNT = "aAccount/ADD_ACCOUNT";
export const GET_ALL_ACCOUNT = "aAccount/GET_ALL_ACCOUNT";
export const GET_ALL_ACCOUNT_SUCCESS = "aAccount/GET_ALL_ACCOUNT_SUCCESS";
export const GET_ACCOUNT_BY_ID = "aAccount/GET_ACCOUNT_BY_ID";
export const GET_ACCOUNT_BY_ID_SUCCESS = "aAccount/GET_ACCOUNT_BY_ID_SUCCESS";
export const EDIT_ACCOUNT = "aAccount/EDIT_ACCOUNT";

const initState = {
  accounts: [],
  accountEdit: {},
};

export function AAccountReducer(state = initState, action = {}) {
  const newState = { ...state };
  switch (action.type) {
    case GET_ALL_ACCOUNT_SUCCESS: {
      newState.accounts = action.response;
      return newState;
    }
    case GET_ACCOUNT_BY_ID_SUCCESS: {
      newState.accountEdit = action.response;
      return newState;
    }
    default:
      return newState;
  }
}
