import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "./features/header";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";
import pageReducer from "./features/page";
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    header: headerReducer,
    page: pageReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
export type Fetch = {
  isLoading: boolean;
  isError: boolean;
};
export type ActionPayload<Payload> = { payload: Payload; type: string };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
