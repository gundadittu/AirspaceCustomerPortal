import { takeLatest, call, put, select } from "redux-saga/effects";
import * as actionTypes from "../store/actions/actionTypes";
import * as selectors from './selectors';
import AirUser from '../models/AirUser';
import { notification } from 'antd';
import React from 'react';
require("firebase/functions");

// Watchers 

export function* loadOfficeUsersWatchSaga() {
    yield takeLatest(actionTypes.LOAD_OFFICE_USERS, loadOfficeUsersWorkerSaga);
}

// Workers 

function loadOfficeUsers(payload, firebase) { 
    const officeUID = payload.officeUID || null;
    const apiCall = firebase.functions.httpsCallable('getAllUsersForOffice')
    
    return apiCall({officeUID: officeUID})
    .then( result => { 
        const data = result.data; 
        var userList = [];
        for (let key in data) {
            const value = data[key];
            const user = new AirUser(value) || null;
            if (user !== null) { 
                userList.push(user);
            }
        }
        return userList;
    })
}

function* loadOfficeUsersWorkerSaga(action) {


    try {
        const selectedOfficeUID = action.payload.officeUID;
        const userAdminOfficeList = yield select(selectors.userAdminOfficeList);
        let firebase = yield select(selectors.firebase);

        if (userAdminOfficeList == null) { 
             notification['error']({
                 message: 'Permission denied.',
                 description: 'Current user is not a admin for this office.'
             });
             throw new Error('Current user is not a admin for this office..'); 
        }

        const newArray = userAdminOfficeList.map( x => { 
             return (x.uid == selectedOfficeUID)
        })
        if (newArray.includes(true) == false) { 
             notification['error']({
                 message: 'Permission denied.',
                 description: 'Current user is not a admin for this office.'
             });
             throw new Error('Current user is not a admin for this office.');
        }

        const response = yield call(loadOfficeUsers, action.payload, firebase);
        yield put({ type: actionTypes.LOAD_OFFICE_USERS_SUCCESS, payload: { userList: response }});
    } catch (error) {
        console.error(error);
        
        notification['error']({
            message: 'Unable to load Users for this office.',
            description: error.message
        });

        yield put({ type: actionTypes.LOAD_OFFICE_USERS_ERROR, payload: {error: error} });
    }
  }