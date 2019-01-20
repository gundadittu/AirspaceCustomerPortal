import { takeLatest, call, put, select } from "redux-saga/effects";
import * as actionTypes from "../store/actions/actionTypes";
import * as selectors from './selectors';
require("firebase/functions");

// Watchers 

export function* loadOfficeUsersWatchSaga() {
    yield takeLatest(actionTypes.LOAD_OFFICE_USERS, loadOfficeUsersWorkerSaga);
}

// Workers 

function loadOfficeUsers(payload, firebase) { 
    const officeUID = payload.officeUID || null;
    const apiCall = firebase.functions.httpsCallable('getAllUsersForOffice')
    console.log(officeUID);
    console.log('loadOfficeUsers');
    return apiCall({officeUID: officeUID})
    .then( result => { 
        console.log("loadOfficeUsers success: "+result);
        return result.data;
    })
}

function* loadOfficeUsersWorkerSaga(action) {
    try {
        let firebase = yield select(selectors.firebase);
        const response = yield call(loadOfficeUsers, action.payload, firebase);
        console.log(response);
        yield put({ type: actionTypes.LOAD_OFFICE_USERS_SUCCESS, payload: { userList: response }});
    } catch (error) {
        console.error(error);
        yield put({ type: actionTypes.LOAD_OFFICE_USERS_ERROR, payload: {error: error} });
    }
  }