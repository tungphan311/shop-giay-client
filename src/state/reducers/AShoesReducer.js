export const GET_SHOES = "aShoes/GET_SHOES";
export const GET_SHOES_SUCCESS = "aShoes/GET_SHOES_SUCCESS";

export const GET_PROVIDERS = "aShoes/GET_PROVIDERS";
export const GET_PROVIDERS_SUCCESS = "aShoes/GET_PROVIDERS_SUCCESS";

export const ADD_PROVIDERS = "aShoes/ADD_PROVIDERS";
export const ADD_PROVIDERS_SUCCESS = "aShoes/ADD_PROVIDERS_SUCCESS";

export const GET_COLORS = "aShoes/GET_COLORS";
export const GET_COLORS_SUCCESS = "aShoes/GET_COLORS_SUCCESS";

export const ADD_COLOR = "aShoes/ADD_COLOR";
export const ADD_COLOR_SUCCESS = "aShoes/ADD_COLOR_SUCCESS";

export const GET_SIZES = "aShoes/GET_SIZES";
export const GET_SIZES_SUCCESS = "aShoes/GET_SIZES_SUCCESS";

export const ADD_SIZE = "aShoes/ADD_SIZE";
export const ADD_SIZE_SUCCESS = "aShoes/ADD_SIZE_SUCCESS";

export const DELETE_SHOES = "aShoes/DELETE_SHOES";
export const DELETE_SHOES_SUCCESS = "aShoes/DELETE_SHOES_SUCCESS";

const initState = {
  shoes: [],
  providers: [],
  colors: [],
  sizes: [],
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

    case GET_COLORS_SUCCESS: {
      newState.colors = action.response;
      return newState;
    }

    case GET_SIZES_SUCCESS: {
      newState.sizes = action.response;
      return newState;
    }

    case ADD_PROVIDERS_SUCCESS: {
      const newProviders = action.response;
      newState.providers = [...newState.providers, newProviders];
      return newState;
    }

    case ADD_COLOR_SUCCESS: {
      const newColor = action.response;
      newState.colors = [...newState.colors, newColor];
      return newState;
    }

    case ADD_SIZE_SUCCESS: {
      const newSize = action.response;
      newState.sizes = [...newState.sizes, newSize];
      return newState;
    }

    default:
      return newState;
  }
}
