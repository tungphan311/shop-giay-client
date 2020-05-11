export const GET_NEW_ARRIVALS = "home/GET_NEW_ARRIVALS";

const initState = {
  banner: null,
};

export const homeReducer = (state = initState, action = {}) => {
  const newState = { ...state };
  switch (action.type) {
    case GET_NEW_ARRIVALS:
      return newState;
  }
};
