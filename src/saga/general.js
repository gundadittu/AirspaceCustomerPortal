import { takeLatest, call, put, select } from "redux-saga/effects";
import * as actionTypes from "../store/actions/actionTypes";
import * as selectors from './selectors';
import "firebase/functions";
import { notification } from 'antd';
import 'react';
import AirNotification from "../models/AirNotification";

export function* loadNotificationsWatchSaga() {
    yield takeLatest(actionTypes.LOAD_NOTIFICATIONS, loadNotificationsWorkerSaga);
}

export function* guestCreatePasswordWatchSaga() {
    yield takeLatest(actionTypes.GUEST_CREATE_PASSWORD, guestCreatePasswordWorkerSaga);
}

function loadNotifications(firebase) {
    const apiCall = firebase.functions.httpsCallable('getUsersNotifications')
    return apiCall({})
    .then( result => {
        const data = result.data;
        var notifications = [];
        for (let key in data) {
            const value = data[key];
            const not = new AirNotification(value) || null;
            if (not !== null) {
                notifications.push(not);
            }
        }
        return notifications;
    })
}

function* loadNotificationsWorkerSaga(action) {
    try {
        let firebase = yield select(selectors.firebase);
        const response = yield call(loadNotifications, firebase);
        yield put({ type: actionTypes.LOAD_NOTIFICATIONS_SUCCESS, payload: { notifications: response } });
    } catch (error) {
        notification['error']({
            message: 'Unable to load notifications.',
            description: error.message
        });
        yield put({ type: actionTypes.LOAD_NOTIFICATIONS_ERROR , payload: { error: error } });
    }
}
//

function guestCreatePassword(payload, firebase) {
    const userUID = payload.userUID;
    console.log("Guest create password function", payload)
    const dict = {
      uid: userUID,
    }
    const apiCall = firebase.functions.httpsCallable('getCreatePasswordLink')
    return apiCall(dict)
    .then( result => {
        console.log("Guest Create Password Result")
        var redirect = result.data;
        return redirect;
    })
}

function* guestCreatePasswordWorkerSaga(action) {
    try {
        console.log("Guest create password worker")
        let firebase = yield select(selectors.firebase);
        const response = yield call(guestCreatePassword, action.payload, firebase);
        yield put({ type: actionTypes.GUEST_CREATE_PASSWORD_SUCCESS, payload: { create_password_url: response } });
    } catch (error) {
        notification['error']({
            message: 'Unable to verify create password.',
            description: error.message
        });
        yield put({ type: actionTypes.GUEST_CREATE_PASSWORD_ERROR , payload: { error: error } });
    }
}
