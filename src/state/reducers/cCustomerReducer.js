const initState = {
  addresses: [],
};

export const ACTION_GET_ADDRESSES = "CUSTOMER/GET_ADDRESSES";
export const ACTION_GET_ADDRESSES_SUCCESS = "CUSTOMER/GET_ADDRESSES_SUCCESS";
export const ACTION_GET_ADDRESSES_FAIL = "CUSTOMER/GET_ADDRESSES_FAIL";

export const cCustomerReducer = (state = initState, action = {}) => {
  const newState = { ...state };
  switch (action.type) {
    case ACTION_GET_ADDRESSES_SUCCESS:
      const { data } = action.payload;
      console.log(data);
      return { ...initState, addresses: [...data] };
    case ACTION_GET_ADDRESSES_FAIL:
      return { ...initState, addresses: [] };
    default:
      return newState;
  }
};
