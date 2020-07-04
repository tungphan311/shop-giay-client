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
  GET_SHOES_BY_ID,
  GET_SHOES_BY_ID_SUCCESS,
  EDIT_SHOES,
} from "state/reducers/AShoesReducer";
import {
  editShoes,
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
  getShoesById,
} from "services/admin/shoesServices";
import { getFormValues as getReduxFormValues } from "redux-form";
import { FORM_KEY_ADDSHOES } from "state/reducers/formReducer";
import { getShoesAction, deleteShoesAction } from "state/actions/index";
import {
  resolvePromiseAction,
  rejectPromiseAction,
} from "@adobe/redux-saga-promise";
import { SET_LOADING, SET_AUTHORIZE } from "state/reducers/aLoadingReducer";

export const getFormValues = (state, formName) =>
  getReduxFormValues(formName)(state);

export function* getAllShoesSaga() {
  try {
    yield put({ type: SET_LOADING });

    const token = yield select((state) => state.aAuth.token);

    const result = yield call(getAllShoes, { page: 0, pageSize: 0, token });
    const responseJSON = result.data.data;
    const { total } = result.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: GET_SHOES_SUCCESS, response, total });

    yield toast({ message: "Lấy danh sách giày thành công" });
  } catch (err) {
    const {
      response: { status },
    } = err;

    if (status === 401) {
      yield put({ type: SET_AUTHORIZE, stt: false });
    }

    yield toastErr(String(err));
  } finally {
    yield put({ type: SET_LOADING, status: false });
  }
}

export function* getShoesSaga(action) {
  try {
    yield put({ type: SET_LOADING });

    const token = yield select((state) => state.aAuth.token);

    const { pageSize, page, filter } = action.payload;
    const result = yield call(getAllShoes, { pageSize, page, filter, token });
    const responseJSON = result.data.data;
    const { total } = result.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: GET_SHOES_SUCCESS, response, total });

    yield call(resolvePromiseAction, action, response);
  } catch (err) {
    const {
      response: { status },
    } = err;

    if (status === 401) {
      yield put({ type: SET_AUTHORIZE, stt: false });
    }

    yield call(rejectPromiseAction, action, String(err));
  } finally {
    yield put({ type: SET_LOADING, status: false });
  }
}

export function* deleteShoesSaga(action) {
  try {
    const token = yield select((state) => state.aAuth.token);

    yield put({ type: SET_LOADING });
    const ids = action.payload;

    yield call(deleteShoes, { ids, token });

    yield call(resolvePromiseAction, action);
  } catch (err) {
    const {
      response: { status },
    } = err;

    if (status === 401) {
      yield call(
        rejectPromiseAction,
        action,
        "Bạn không có quyền để thực hiện chức năng này"
      );
    } else {
      yield call(rejectPromiseAction, action, String(err));
    }
  } finally {
    yield put({ type: SET_LOADING, status: false });
  }
}

export function* getShoesByIdSaga({ id }) {
  try {
    yield put({ type: SET_LOADING });

    const token = yield select((state) => state.aAuth.token);

    const result = yield call(getShoesById, { id, token });
    const responseJSON = result.data.data;
    const response = JSON.parse(responseJSON);

    let colors = yield select((state) => state.aShoes.colors);
    let sizes = yield select((state) => state.aShoes.sizes);

    if (!colors.length) {
      const res = yield call(getColors);
      const responseJSON = res.data.data;

      colors = JSON.parse(responseJSON);
    }
    if (!sizes.length) {
      const res = yield call(getSizes);
      const responseJSON = res.data.data;

      sizes = JSON.parse(responseJSON);
    }
    yield put({ type: GET_SHOES_BY_ID_SUCCESS, response, colors, sizes });
  } catch (err) {
    const {
      response: { status },
    } = err;

    if (status === 401) {
      yield put({ type: SET_AUTHORIZE, stt: false });
    }
  } finally {
    yield put({ type: SET_LOADING, status: false });
  }
}

export function* getProvidersSaga() {
  try {
    const token = yield select((state) => state.aAuth.token);

    const result = yield call(getProviders, { token });
    const responseJSON = result.data.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: GET_PROVIDERS_SUCCESS, response });
  } catch (err) {
    const {
      response: { status },
    } = err;

    if (status === 401) {
      yield put({ type: SET_AUTHORIZE, stt: false });
    }
  }
}

export function* addProvidersSaga({ name }) {
  try {
    const token = yield select((state) => state.aAuth.token);

    const result = yield call(addProviders, { name, token });
    const responseJSON = result.data.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: ADD_PROVIDERS_SUCCESS, response });
  } catch (err) {
    const {
      response: { status },
    } = err;

    if (status === 401) {
      yield put({ type: SET_AUTHORIZE, stt: false });
    }
  }
}

export function* getColorsSaga() {
  try {
    const token = yield select((state) => state.aAuth.token);

    const result = yield call(getColors, { token });
    const responseJSON = result.data.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: GET_COLORS_SUCCESS, response });
  } catch (err) {
    const {
      response: { status },
    } = err;

    if (status === 401) {
      yield put({ type: SET_AUTHORIZE, stt: false });
    }
  }
}

export function* addColorSaga({ name }) {
  try {
    const token = yield select((state) => state.aAuth.token);

    const result = yield call(addColor, { name, token });
    const responseJSON = result.data.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: ADD_COLOR_SUCCESS, response });
  } catch (err) {
    const {
      response: { status },
    } = err;

    if (status === 401) {
      yield put({ type: SET_AUTHORIZE, stt: false });
    }
  }
}

export function* getSizesSaga() {
  try {
    const token = yield select((state) => state.aAuth.token);

    const result = yield call(getSizes, { token });
    const responseJSON = result.data.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: GET_SIZES_SUCCESS, response });
  } catch (err) {
    const {
      response: { status },
    } = err;

    if (status === 401) {
      yield put({ type: SET_AUTHORIZE, stt: false });
    }
  }
}

export function* addSizeSaga({ name }) {
  try {
    const token = yield select((state) => state.aAuth.token);

    const result = yield call(addSize, { name, token });
    const responseJSON = result.data.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: ADD_SIZE_SUCCESS, response });
  } catch (err) {
    yield toastErr(String(err));
  }
}

export function* getGendersSaga() {
  try {
    const token = yield select((state) => state.aAuth.token);

    const result = yield call(getGenders, { token });
    const responseJSON = result.data.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: GET_GENDERS_SUCCESS, response });
  } catch (err) {
    const {
      response: { status },
    } = err;

    if (status === 401) {
      yield put({ type: SET_AUTHORIZE, stt: false });
    }
  }
}

export function* getShoesTypesSaga() {
  try {
    const token = yield select((state) => state.aAuth.token);

    const result = yield call(getShoesType, { token });
    const responseJSON = result.data.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: GET_SHOESTYPES_SUCCESS, response });
  } catch (err) {
    const {
      response: { status },
    } = err;

    if (status === 401) {
      yield put({ type: SET_AUTHORIZE, stt: false });
    }
  }
}

export function* getShoesBrandsSaga() {
  try {
    const token = yield select((state) => state.aAuth.token);

    const result = yield call(getShoesBrand, { token });
    const responseJSON = result.data.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: GET_SHOESBRANDS_SUCCESS, response });
  } catch (err) {
    const {
      response: { status },
    } = err;

    if (status === 401) {
      yield put({ type: SET_AUTHORIZE, stt: false });
    }
  }
}

export function* editShoesSaga({ id }) {
  try {
    const token = yield select((state) => state.aAuth.token);

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
    console.log("go", {
      id,
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
    brandId = brandId && brandId.value;
    genderId = genderId && genderId.value;
    styleId = styleId && styleId.value;
    stocks = stocks.map((s) => ({
      instock: parseInt(s.instock),
      colorId: s.colorId.value,
      sizeId: s.sizeId.value,
    }));
    price = price && parseFloat(price);
    images =
      images && images.filter((image) => Object.keys(image).length !== 0);
    images =
      images &&
      images.map((i) => ({
        colorId: 2,
        imagePath: i,
      }));
    description = description || "";
    yield call(editShoes, {
      id,
      name,
      code,
      price,
      images,
      stocks,
      genderId,
      brandId,
      styleId,
      description,
      token,
    });
    toast({ message: "Sửa thành công" });
  } catch (err) {
    const {
      response: { status },
    } = err;

    if (status === 401) {
      yield put({ type: SET_AUTHORIZE, stt: false });
    }
  }
}

export function* addShoesSaga() {
  try {
    const token = yield select((state) => state.aAuth.token);

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
      token,
    });
    toast({ message: "Thêm thành công" });
  } catch (err) {
    const {
      response: { status },
    } = err;

    if (status === 401) {
      yield put({ type: SET_AUTHORIZE, stt: false });
    }
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
  yield takeEvery(GET_SHOES_BY_ID, getShoesByIdSaga);
  yield takeEvery(EDIT_SHOES, editShoesSaga);
}
