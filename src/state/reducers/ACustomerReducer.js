export const GET_CUSTOMER_BY_ID = "aCustomer/GET_CUSTOMER_BY_ID";
export const GET_CUSTOMER_BY_ID_SUCCESS =
  "aCustomer/GET_CUSTOMER_BY_ID_SUCCESS";

const initState = {
  customer: {},
};

export function ACustomerReducer(state = initState, action = {}) {
  const newState = { ...state };
  switch (action.type) {
    case GET_CUSTOMER_BY_ID_SUCCESS: {
      newState.customer = action.response;
      return newState;
    }
    default:
      return newState;
  }
}
