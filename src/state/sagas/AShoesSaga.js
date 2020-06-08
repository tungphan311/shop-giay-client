import { takeEvery, put, call, select } from "redux-saga/effects";
import { toast, toastErr } from "utils";
import {
  GET_SHOES,
  GET_SHOES_SUCCESS,
  GET_PROVIDERS,
  GET_PROVIDERS_SUCCESS,
  ADD_PROVIDERS,
  ADD_PROVIDERS_SUCCESS,
  GET_COLORS,
  GET_COLORS_SUCCESS,
  ADD_COLOR,
  ADD_COLOR_SUCCESS,
  GET_SIZES,
  GET_SIZES_SUCCESS,
  ADD_SIZE,
  ADD_SIZE_SUCCESS,
  GET_GENDERS,
  GET_GENDERS_SUCCESS,
  GET_SHOESTYPES,
  GET_SHOESTYPES_SUCCESS,
  GET_SHOESBRANDS,
  GET_SHOESBRANDS_SUCCESS,
  ADD_SHOES,
} from "state/reducers/AShoesReducer";
import {
  getAllShoes,
  getProviders,
  addProviders,
  getColors,
  addColor,
  getSizes,
  addSize,
  getGenders,
  getShoesType,
  getShoesBrand,
  addShoes,
  deleteShoes,
} from "services/admin/shoesServices";
import { getFormValues as getReduxFormValues } from "redux-form";
import { FORM_KEY_ADDSHOES } from "state/reducers/formReducer";
import { getShoesAction, deleteShoesAction } from "state/actions/index";
import {
  resolvePromiseAction,
  rejectPromiseAction,
} from "@adobe/redux-saga-promise";
import { SET_LOADING } from "state/reducers/aLoadingReducer";

export const getFormValues = (state, formName) =>
  getReduxFormValues(formName)(state);

export function* getAllShoesSaga() {
  try {
    // yield put({ type: SET_LOADING });

    const result = yield call(getAllShoes);
    const responseJSON = result.data.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: GET_SHOES_SUCCESS, response });

    yield toast({ message: "Lấy danh sách giày thành công" });
  } catch (err) {
    yield toastErr(String(err));
  } finally {
    // yield put({ type: SET_LOADING, status: false });
  }
}

export function* getShoesSaga(action) {
  try {
    yield put({ type: SET_LOADING });
    const result = yield call(getAllShoes);
    const responseJSON = result.data.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: GET_SHOES_SUCCESS, response });

    yield call(resolvePromiseAction, action, response);
  } catch (err) {
    yield call(rejectPromiseAction, action, String(err));
  } finally {
    yield put({ type: SET_LOADING, status: false });
  }
}

export function* deleteShoesSaga(action) {
  try {
    yield put({ type: SET_LOADING });
    const ids = action.payload;

    yield call(deleteShoes, { ids });

    yield call(resolvePromiseAction, action);
  } catch (err) {
    yield call(rejectPromiseAction, action, String(err));
  } finally {
    yield put({ type: SET_LOADING, status: false });
  }
}

export function* getProvidersSaga() {
  try {
    const result = yield call(getProviders);
    const responseJSON = result.data.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: GET_PROVIDERS_SUCCESS, response });
  } catch (err) {
    yield toastErr(String(err));
  }
}

export function* addProvidersSaga({ name }) {
  try {
    const result = yield call(addProviders, { name });
    const responseJSON = result.data.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: ADD_PROVIDERS_SUCCESS, response });
  } catch (err) {
    yield toastErr(String(err));
  }
}

export function* getColorsSaga() {
  try {
    const result = yield call(getColors);
    const responseJSON = result.data.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: GET_COLORS_SUCCESS, response });
  } catch (err) {
    yield toastErr(String(err));
  }
}

export function* addColorSaga({ name }) {
  try {
    const result = yield call(addColor, { name });
    const responseJSON = result.data.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: ADD_COLOR_SUCCESS, response });
  } catch (err) {
    yield toastErr(String(err));
  }
}

export function* getSizesSaga() {
  try {
    const result = yield call(getSizes);
    const responseJSON = result.data.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: GET_SIZES_SUCCESS, response });
  } catch (err) {
    yield toastErr(String(err));
  }
}

export function* addSizeSaga({ name }) {
  try {
    const result = yield call(addSize, { name });
    const responseJSON = result.data.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: ADD_SIZE_SUCCESS, response });
  } catch (err) {
    yield toastErr(String(err));
  }
}

export function* getGendersSaga() {
  try {
    const result = yield call(getGenders);
    const responseJSON = result.data.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: GET_GENDERS_SUCCESS, response });
  } catch (err) {
    yield toastErr(String(err));
  }
}

export function* getShoesTypesSaga() {
  try {
    const result = yield call(getShoesType);
    const responseJSON = result.data.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: GET_SHOESTYPES_SUCCESS, response });
  } catch (err) {
    yield toastErr(String(err));
  }
}

export function* getShoesBrandsSaga() {
  try {
    const result = yield call(getShoesBrand);
    const responseJSON = result.data.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: GET_SHOESBRANDS_SUCCESS, response });
  } catch (err) {
    yield toastErr(String(err));
  }
}

export function* addShoesSaga() {
  try {
    let {
      name,
      code,
      price,
      images,
      stocks,
      genderId,
      brandId,
      styleId,
      description,
    } = yield select((state) => getFormValues(state, FORM_KEY_ADDSHOES));

    brandId = brandId.value;
    genderId = genderId.value;
    styleId = styleId.value;
    stocks = stocks.map((s) => ({
      instock: parseInt(s.instock),
      colorId: s.colorId.value,
      sizeId: s.sizeId.value,
    }));
    price = parseFloat(price);
    images = images.filter((image) => Object.keys(image).length !== 0);
    images = images.map((i) => ({
      colorId: 2,
      imagePath: i,
    }));
    description = description || "";

    yield call(addShoes, {
      name,
      code,
      price,
      images,
      stocks,
      genderId,
      brandId,
      styleId,
      description,
    });
    toast({ message: "Thêm thành công" });
  } catch (err) {
    yield toastErr(String(err));
  }
}

export default function* aShoesSaga() {
  yield takeEvery(GET_SHOES, getAllShoesSaga);
  yield takeEvery(GET_PROVIDERS, getProvidersSaga);
  yield takeEvery(ADD_PROVIDERS, addProvidersSaga);
  yield takeEvery(GET_COLORS, getColorsSaga);
  yield takeEvery(ADD_COLOR, addColorSaga);
  yield takeEvery(GET_SIZES, getSizesSaga);
  yield takeEvery(ADD_SIZE, addSizeSaga);
  yield takeEvery(GET_GENDERS, getGendersSaga);
  yield takeEvery(GET_SHOESTYPES, getShoesTypesSaga);
  yield takeEvery(GET_SHOESBRANDS, getShoesBrandsSaga);
  yield takeEvery(ADD_SHOES, addShoesSaga);
  yield takeEvery(getShoesAction, getShoesSaga);
  yield takeEvery(deleteShoesAction, deleteShoesSaga);
}
