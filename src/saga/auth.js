import { takeLatest, call, put, select } from "redux-saga/effects";
import * as actionTypes from "../store/actions/actionTypes";
import * as selectors from './selectors';
import AirOffice from "../models/AirOffice";
require("firebase/functions");

// Watchers

export function* userSignInWatchSaga() {
    yield takeLatest(actionTypes.SIGN_IN_USER, userSignInWorkerSaga);
}

export function* userSignOutWatchSaga() {
    yield takeLatest(actionTypes.SIGN_OUT_USER, userSignOutWorkerSaga);
  }

export function* watchSetUpUserSaga() {
    yield takeLatest(actionTypes.SET_UP_USER, workerSetUpUserSaga);
}

/* -------------------------------------------------------------------------- */

function signInUser(payload, firebase) {
    const email = payload.email || null;
    const password = payload.password || null;

    return firebase.auth.signInWithEmailAndPassword(email, password)
    .catch(error => {
        throw error;
    })
  }

function* userSignInWorkerSaga(action) {
    try {
        let firebase = yield select(selectors.firebase);
        const response = yield call(signInUser, action.payload, firebase);
        // Need to properly parse call here
        console.log("SIGN IN CALL SUCCESSFUL");
        yield put({ type: actionTypes.SIGN_IN_USER_SUCCESS });
    } catch (error) {
        console.error(error);
        yield put({ type: actionTypes.SIGN_IN_USER_ERROR, payload: {error: error} });
    }
  }

  /* -------------------------------------------------------------------------- */

  function signOutUser(firebase) {
      return firebase.auth.signOut()
      .catch(error => {
          throw error;
      })
    }

  function* userSignOutWorkerSaga(action) {
      try {
          let firebase = yield select(selectors.firebase);
          const response = yield call(signOutUser, firebase);
          // Need to properly parse call here
          console.log("SIGN OUT CALL SUCCESSFUL");
          yield put({ type: actionTypes.SIGN_OUT_USER_SUCCESS });
      } catch (error) {
          console.error(error);
          yield put({ type: actionTypes.SIGN_OUT_USER_ERROR, payload: {error: error} });
      }
    }

    /* -------------------------------------------------------------------------- */

function setUpUser(payload, firebase) {
    const uid = payload.uid || null;
    const apiCall = firebase.functions.httpsCallable('getUserInfo')
    return apiCall({uid: uid})
    .then( result => {
        const data = result.data;

        let adminOffices = [];
        for (let key in data.officeAdmin) { 
            const officeDict = data.officeAdmin[key];
            const office = new AirOffice(officeDict);
            if (office) { 
                adminOffices.push(office);
            }
        }
        data.officeAdmin = adminOffices;

        let userOffices = [];
        for (let key in data.offices) { 
            const officeDict = data.offices[key];
            const office = new AirOffice(officeDict);
            if (office) { 
                userOffices.push(office);
            }
        }
        data.offices = userOffices;

        return data;
    })
  }

function* workerSetUpUserSaga(action) {
    try {
        let firebase = yield select(selectors.firebase);
        const response = yield call(setUpUser, action.payload, firebase);
        yield put({ type: actionTypes.SET_UP_USER_SUCCESS, payload: {data: response}});
    } catch (error) {
        console.error(error);
        yield put({ type: actionTypes.SET_UP_USER_ERROR, payload: {error: error} });
    }
  }
