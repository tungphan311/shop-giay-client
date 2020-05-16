export const ACTION_ADD_PRODUCT_TO_CART = "CART/ADD_PRODUCT";
export const ACTION_GET_CART_ITEMS = "CART/GET_CART_ITEMS";
export const ACTION_GET_CART_ITEMS_SUCCESS = "CART/GET_CART_ITEMS_SUCCESS";
export const ACTION_GET_CART_ITEMS_FAIL = "CART/GET_CART_ITEMS_FAIL";

const initState = {
  cartItems: [],
};
export const cCartReducer = (state = initState, action = {}) => {
  const newState = { ...state };
  switch (action.type) {
    case ACTION_GET_CART_ITEMS_SUCCESS:
      const { cartItems } = action.payload;
      newState.cartItems = [...cartItems];
      return newState;
    case ACTION_GET_CART_ITEMS_FAIL:
      newState.cartItems = [];
      return newState;
    default:
      return newState;
  }
};
