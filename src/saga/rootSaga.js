import { all } from 'redux-saga/effects';
import watchSetUpUserSaga from "./auth"; 

export default function* rootSaga() {
    yield all([
        watchSetUpUserSaga
    ]);
  }