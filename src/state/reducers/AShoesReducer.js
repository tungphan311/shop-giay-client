export const GET_SHOES = "aShoes/GET_SHOES";
export const GET_SHOES_SUCCESS = "aShoes/GET_SHOES_SUCCESS";

export const GET_PROVIDERS = "aShoes/GET_PROVIDERS";
export const GET_PROVIDERS_SUCCESS = "aShoes/GET_PROVIDERS_SUCCESS";

export const ADD_PROVIDERS = "aShoes/ADD_PROVIDERS";
export const ADD_PROVIDERS_SUCCESS = "aShoes/ADD_PROVIDERS_SUCCESS";

const initState = {
  shoes: [],
  providers: [],
};

export function AShoesReducer(state = initState, action = {}) {
  const newState = { ...state };

  switch (action.type) {
    case GET_SHOES_SUCCESS: {
      newState.shoes = action.response;
      return newState;
    }

    case GET_PROVIDERS_SUCCESS: {
      newState.providers = action.response;
      return newState;
    }

    case ADD_PROVIDERS_SUCCESS: {
      const newProviders = action.response;

      newState.providers = [...newState.providers, newProviders];

      return newState;
    }

    default:
      return newState;
  }
}
