import { call, put, takeLatest, all } from "redux-saga/effects";
import { fetchCategorySuccess, fetchCategoryfail } from "./categories.action";
import { getcategoryAndDocument } from "../../utils/firebase/firebase.utils";
import CATEGORIES_ACTION_TYPES from "./categories.types";

export function* fetchCategoryAsync() {
  try {
    const categoriesArray = yield call(getcategoryAndDocument, "categories");
    yield put(fetchCategorySuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoryfail(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoryAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
