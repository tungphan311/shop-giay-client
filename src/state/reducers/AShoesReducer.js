export const GET_SHOES = "aShoes/GET_SHOES";
export const GET_SHOES_SUCCESS = "aShoes/GET_SHOES_SUCCESS";

const initState = {
  shoes: [],
};

export function AShoesReducer(state = initState, action = {}) {
  const newState = { ...state };

  switch (action.type) {
    case GET_SHOES_SUCCESS: {
      newState.shoes = action.response;
      return newState;
    }

    // case LOGOUT_SUCCESS:
    default:
      return newState;
  }
}
