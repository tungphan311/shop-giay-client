import { takeEvery, put, call, select } from "redux-saga/effects";
import { toast, toastErr } from "utils";
import { GET_SHOES, GET_SHOES_SUCCESS } from "state/reducers/AShoesReducer";
import { getAllShoes } from "services/admin/shoesServices";

export function* getAllShoesSaga() {
  try {
    // yield put({ type: SET_LOADING });

    const result = yield call(getAllShoes);
    const responseJSON = result.data.data;

    console.log(responseJSON);

    const response = JSON.parse(responseJSON);

    yield put({ type: GET_SHOES_SUCCESS, response });

    yield toast({ message: "Lấy danh sách giày thành công" });
  } catch (err) {
    yield toastErr(String(err));
  } finally {
    // yield put({ type: SET_LOADING, status: false });
  }
}

export default function* aShoesSaga() {
  yield takeEvery(GET_SHOES, getAllShoesSaga);
}
