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

export function* createUserForOfficeAdmin() {
    yield takeLatest(actionTypes.CREATE_USER_FOR_OFFICEADMIN, createUserWorkerSaga);
}

// Workers 


function validatePermission(selectedOfficeUID, userAdminOfficeList) { 

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
}

function createUserApiCall(payload, firebase) { 
    const firstName = payload.firstName; 
    const lastName = payload.lastName;
    const email = payload.emailAddress; 
    const makeUserOfficeAdmin = payload.makeUserOfficeAdmin;
    const selectedOfficeUID = payload.officeUID;
    const type = 'regular';
    const dict = {firstName: firstName, lastName: lastName, email: email, makeUserOfficeAdmin: makeUserOfficeAdmin, selectedOfficeUID: selectedOfficeUID, type: type };

    const apiCall = firebase.functions.httpsCallable('addUserToOffice');
    return apiCall(dict)
    .then( result => { 
       console.log('createUserApiCall-success');
       return null
    })
}

function* createUserWorkerSaga(action) { 
    try {
        const payload = action.payload;
        const selectedOfficeUID = payload.officeUID;
        const userAdminOfficeList = yield select(selectors.userAdminOfficeList);
        validatePermission(selectedOfficeUID, userAdminOfficeList);
        let firebase = yield select(selectors.firebase);
        const response = yield call(createUserApiCall, payload, firebase);
        const newPayload = { componentRef: payload.componentRef, formRef: payload.formRef }
        yield put({ type: actionTypes.CREATE_USER_FOR_OFFICEADMIN_FINISHED, payload: { ...newPayload }})
    } catch (error) {
        console.error(error);
        
        notification['error']({
            message: 'Unable to add user.',
            description: error.message
        });
        const payload = action.payload;
        const newPayload = { componentRef: payload.componentRef, formRef: payload.formRef }
        yield put({ type: actionTypes.CREATE_USER_FOR_OFFICEADMIN_FINISHED, payload: { ...newPayload } });
    }
}

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
        const userAdminOfficeList = yield select(selectors.userAdminOfficeList)
        validatePermission(selectedOfficeUID, userAdminOfficeList);

        let firebase = yield select(selectors.firebase);

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