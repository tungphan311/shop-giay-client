export const ACTION_PLACE_ORDER = "ORDER/PLACE";

const initState = {
  address: {},
};

export const ACTION_SET_ORDER_ADDRESS = "ORDER/SET_ADDRESS";

export const cOrderReducer = (state = initState, action = {}) => {
  const newState = { ...state };
  switch (action.type) {
    case ACTION_SET_ORDER_ADDRESS:
      const { data } = action.payload;
      return { ...newState, address: { ...data } };

    default:
      return newState;
  }
};
