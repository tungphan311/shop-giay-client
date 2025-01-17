export const GET_CUSTOMER_SUCCESS = "aCustomer/GET_CUSTOMER_SUCCESS";

export const GET_GENDER = "aCustomer/GET_GENDER";
export const GET_GENDER_SUCCESS = "aCustomer/GET_GENDER_SUCCESS";

export const GET_CUSTOMER_BY_ID = "aCustomer/GET_CUSTOMER_BY_ID";
export const GET_CUSTOMER_BY_ID_SUCCESS =
  "aCustomer/GET_CUSTOMER_BY_ID_SUCCESS";

const initState = {
  customers: [],
  genders: [],
  totalRows: 0,
  customer: {},
};

export function ACustomerReducer(state = initState, action = {}) {
  const newState = { ...state };

  switch (action.type) {
    case GET_CUSTOMER_SUCCESS: {
      newState.customers = action.response;
      newState.totalRows = action.total;
      return newState;
    }

    case GET_GENDER_SUCCESS: {
      let genders = action.response;
      newState.genders = genders.map((g) => ({ name: g.Name, id: g.Id }));
      return newState;
    }

    case GET_CUSTOMER_BY_ID_SUCCESS: {
      newState.customer = action.response;
      return newState;
    }

    default:
      return newState;
  }
}
