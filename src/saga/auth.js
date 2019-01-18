import { takeLatest, call, put, select } from "redux-saga/effects";
import * as actionTypes from "../store/actions/actionTypes";
import * as selectors from './selectors';
require("firebase/functions");

// Watchers 

export function* userSignInWatchSaga() {
    yield takeLatest(actionTypes.SIGN_IN_USER, userSignInWorkerSaga);
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

function setUpUser(payload, firebase) {
    // modify payload? remove payload?
    // access current user instance, else throw error 
    // get type, etc. info about user
    // then return user objet 
    const uid = payload.uid || null;
    const apiCall = firebase.functions.httpsCallable('getUserType')
    return apiCall({uid: uid})
    .then( result => { 
        console.log(result);
        return result;
    })
  }
  
function* workerSetUpUserSaga(action) {
    try {
        let firebase = yield select(selectors.firebase);
        const response = yield call(setUpUser, action.payload, firebase);
        const data = response.data;
        console.log("workerSetUpUserSaga - got response");
        yield put({ type: actionTypes.SET_UP_USER_SUCCESS, payload: {data: data}});
    } catch (error) {
        console.error(error);
        yield put({ type: actionTypes.SET_UP_USER_ERROR, payload: {error: error} });
    }
  }