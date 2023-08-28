import { all } from "redux-saga/effects";
import headerSaga from "./features/header";
import homePageSaga from "./features/page";
function* rootSaga() {
  yield all([headerSaga(), homePageSaga()]);
}

export default rootSaga;
