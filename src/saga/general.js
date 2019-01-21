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