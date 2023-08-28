import { HomePageResponse, pageApi } from "@/app/api/page.api";
import { ApolloQueryResult } from "@apollo/client";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchHomePageError,
  FETCH_HOME_PAGE,
  setHomePage,
} from "../../features/page";

function* fetchHomePage() {
  try {
    const response: ApolloQueryResult<HomePageResponse> = yield call(() =>
      pageApi.homePage()
    );
    if (response.data) {
      yield put(setHomePage(response.data));
    }
  } catch (e) {
    yield put(fetchHomePageError());
  }
}

function* homePageSaga() {
  yield takeLatest(FETCH_HOME_PAGE, fetchHomePage);
}

export default homePageSaga;
