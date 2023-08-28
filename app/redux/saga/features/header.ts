import { ResponseEntity, ResponseRows } from "@/app/api";
import blogCategoryApi, { BlogCategory } from "@/app/api/blog-category.api";
import { AxiosResponse } from "axios";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  fetchNavItemsError,
  FETCH_NAV_ITEMS,
  setNavItems,
} from "../../features/header";

function* fetchNavItems() {
  try {
    const response: AxiosResponse<ResponseEntity<ResponseRows<BlogCategory>>> =
      yield call(() => blogCategoryApi.getAll({ nested: true }));
    const { data } = response.data;
    yield put(setNavItems(data.rows));
  } catch (e) {
    yield put(fetchNavItemsError());
  }
}

function* headerSaga() {
  yield takeLatest(FETCH_NAV_ITEMS, fetchNavItems);
}

export default headerSaga;
