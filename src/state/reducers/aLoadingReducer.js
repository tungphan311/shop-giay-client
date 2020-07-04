export const SET_LOADING = "aLoading/SET_LOADING";
export const SET_AUTHORIZE = "aLoading/SET_AUTHORIZE";

const initState = {
  isLoading: false,
  isAuthorize: true,
};

export function aLoadingReducer(state = initState, action = {}) {
  const newState = { ...state };
  switch (action.type) {
    case SET_LOADING:
      const { status = true } = action;
      newState.isLoading = status;
      return newState;

    case SET_AUTHORIZE:
      const { stt = true } = action;
      newState.isAuthorize = stt;
      return newState;

    default:
      return newState;
  }
}
