import { takeLatest, call, put } from "redux-saga/effects";
import * as actionTypes from "../store/actions/actionTypes";

export default function* watchSetUpUserSaga() {
    yield takeLatest(actionTypes.SET_UP_USER, workerSetUpUserSaga);
  }

  // function that makes the api request and returns a Promise for response
function setUpUser(payload) {
    const uid = payload.uid || null; 
    // return axios({
    //   method: "get",
    //   url: "https://dog.ceo/api/breeds/image/random"
    // });
    
    console.log("SIGN IN CALL MADE");
    return {};
  }
  
// worker saga: makes the api call when watcher saga sees the action
function* workerSetUpUserSaga(action) {
    try {
        const response = yield call(setUpUser, action.payload);
        const data = response.data;
        console.log(data);
        yield put({ type: actionTypes.SET_UP_USER_SUCCESS, data });
    } catch (error) {
        console.error(error);
        yield put({ type: actionTypes.SET_UP_USER_ERROR, error });
    }
  }