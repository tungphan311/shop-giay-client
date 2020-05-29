const initState = {
  id: 0,
  code: "",
  name: "",
  description: "",
  rating: 0.0,
  styleName: "",
  brandName: "",
  genderName: "",
  price: 0,
  salePrice: 0,
  isOnSale: 0,
  images: [],
  sizes: [],
  reviewCount: 0,
};

export const ACTION_GET_PRODUCT_DETAIL = "PRODUCT/GET_DETAIL";
export const ACTION_GET_PRODUCT_DETAIL_SUCCESS = "PRODUCT/GET_DETAIL_SUCCESS";
export const ACTION_GET_PRODUCT_DETAIL_FAIL = "PRODUCT/GET_DETAIL_FAIL";
export const ACTION_RATE_PRODUCT = "PRODUCT/RATE";

export const cProductReducer = (state = initState, action = {}) => {
  const newState = { ...state };
  switch (action.type) {
    case ACTION_GET_PRODUCT_DETAIL_SUCCESS:
      const { data } = action.payload;
      return { ...data };
    case ACTION_GET_PRODUCT_DETAIL_FAIL:
      return { ...initState };
    default:
      return newState;
  }
};
