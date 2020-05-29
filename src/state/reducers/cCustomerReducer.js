const initState = {
  addresses: [],
  addressFormDisplay: false,
};

export const ACTION_GET_ADDRESSES = "CUSTOMER/GET_ADDRESSES";
export const ACTION_GET_ADDRESSES_SUCCESS = "CUSTOMER/GET_ADDRESSES_SUCCESS";
export const ACTION_GET_ADDRESSES_FAIL = "CUSTOMER/GET_ADDRESSES_FAIL";
export const ACTION_SHOW_ADDRESS_FORM = "CUSTOMER/SHOW_ADDRESS_FORM";
export const ACTION_HIDE_ADDRESS_FORM = "CUSTOMER/HIDE_ADDRESS_FORM";
export const ACTION_UPDATE_ADDRESS = "CUSTOMER/UPDATE_ADDRESS";
export const ACTION_UPDATE_ADDRESS_SUCCESS = "CUSTOMER/UPDATE_ADDRESS_SUCCESS";
export const ACTION_UPDATE_ADDRESS_FAIL = "CUSTOMER/UPDATE_ADDRESS_FAIL";

export const cCustomerReducer = (state = initState, action = {}) => {
  const newState = { ...state };
  switch (action.type) {
    case ACTION_GET_ADDRESSES_SUCCESS:
      const { data } = action.payload;
      return { ...newState, addresses: [...data] };
    case ACTION_GET_ADDRESSES_FAIL:
      return { ...newState, addresses: [] };
    case ACTION_SHOW_ADDRESS_FORM:
      return { ...newState, addressFormDisplay: true };
    case ACTION_HIDE_ADDRESS_FORM:
      return { ...newState, addressFormDisplay: false };
    default:
      return newState;
  }
};
