export const ADD_SALE = "aSale/ADD_SALE";

const initState = {
  sales: [],
};

export function ASaleReducer(state = initState, action = {}) {
  const newState = { ...state };
  switch (action.type) {
    default:
      return newState;
  }
}
