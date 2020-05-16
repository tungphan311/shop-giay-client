export const ACTION_ADD_PRODUCT_TO_CART = "CART/ADD_PRODUCT";
export const ACTION_GET_CART_ITEMS = "CART/GET_CART_ITEMS";
export const ACTION_GET_CART_ITEMS_SUCCESS = "CART/GET_CART_ITEMS_SUCCESS";
export const ACTION_GET_CART_ITEMS_FAIL = "CART/GET_CART_ITEMS_FAIL";
export const ACTION_UPDATE_CART = "CART/UPDATE";
export const ACTION_UPDATE_CART_SUCCESS = "CART/UPDATE_SUCCESS";
export const ACTION_UPDATE_CART_FAIL = "CART/UPDATE_FAILED";

const initState = {
  cartItems: [],
};
export const cCartReducer = (state = initState, action = {}) => {
  const newState = { ...state };
  switch (action.type) {
    case ACTION_GET_CART_ITEMS_SUCCESS:
      const { data } = action.payload;
      newState.cartItems = [...data];
      return newState;
    case ACTION_GET_CART_ITEMS_FAIL:
      newState.cartItems = [];
      return newState;
    case ACTION_UPDATE_CART_SUCCESS:
      const { data: newData } = action.payload;
      newState.cartItems = [...newData];
      return newState;
    case ACTION_UPDATE_CART_FAIL:
      newState.cartItems = [];
      return newState;
    default:
      return newState;
  }
};
