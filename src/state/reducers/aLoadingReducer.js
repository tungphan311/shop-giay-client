export const SET_LOADING = "aLoading/SET_LOADING";

const initState = {
  isLoading: false,
};

export function aLoadingReducer(state = initState, action = {}) {
  const newState = { ...state };
  switch (action.type) {
    case SET_LOADING:
      const { status = true } = action;
      newState.isLoading = status;
      return newState;

    default:
      return newState;
  }
}
