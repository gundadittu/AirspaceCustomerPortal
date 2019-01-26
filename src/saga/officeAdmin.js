import { takeLatest, call, put, select } from "redux-saga/effects";
import * as actionTypes from "../store/actions/actionTypes";
import * as selectors from './selectors';
import AirUser from '../models/AirUser';
import AirConferenceRoom from '../models/AirConferenceRoom'
import { notification } from 'antd';
import React from 'react';
require("firebase/functions");

// Watchers

export function* loadOfficeUsersWatchSaga() {
    yield takeLatest(actionTypes.LOAD_OFFICE_USERS, loadOfficeUsersWorkerSaga);
}

export function* loadConferenceRoomsWatchSaga() {
    yield takeLatest(actionTypes.LOAD_CONFERENCE_ROOMS, loadConferenceRoomsWorkerSaga);
}

export function* createUserForOfficeAdmin() {
    yield takeLatest(actionTypes.CREATE_USER_FOR_OFFICEADMIN, createUserWorkerSaga);
}

export function* removeUserForOfficeAdmin() {
    yield takeLatest(actionTypes.REMOVE_OFFICE_USER, removeUserWorkerSaga);
}

export function* editUserForOfficeAdmin() {
    yield takeLatest(actionTypes.EDIT_OFFICE_USER, editUserWorkerSaga);
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
        
        notification['success']({
            message: 'Successfully added new user.',
            description: ''
        });

        const newPayload = { hideFormRef: payload.hideFormRef }
        yield put({ type: actionTypes.CREATE_USER_FOR_OFFICEADMIN_FINISHED, payload: { ...newPayload }})
    } catch (error) {
        console.error(error);

        notification['error']({
            message: 'Unable to add user.',
            description: error.message
        });
        const payload = action.payload;
        const newPayload = { hideFormRef: payload.hideFormRef }
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

  function loadConferenceRooms(payload, firebase) {
      const officeUID = payload.officeUID || null;
      const apiCall = firebase.functions.httpsCallable('getAllConferenceRoomsForUser')

      return apiCall({officeUID: officeUID})
      .then( result => {
          const data = result.data;

          var userList = [];
          var conferenceRooms = [];
          for (let key in data) {
            const value = data[key];
            const room = new AirConferenceRoom(value) || null;
            if (room !== null) {
              conferenceRooms.push(room)
            }
          }
          console.log("THIS IS THE CONFERENCE ROOMS");
          console.log(conferenceRooms);
          return conferenceRooms;
      })
  }

  function* loadConferenceRoomsWorkerSaga(action) {
      try {
          const selectedOfficeUID = action.payload.officeUID;
          const userAdminOfficeList = yield select(selectors.userAdminOfficeList)
          validatePermission(selectedOfficeUID, userAdminOfficeList);

          let firebase = yield select(selectors.firebase);

          const response = yield call(loadConferenceRooms, action.payload, firebase);
          console.log("THIS IS THE RESPONSE");
          console.log(response);
          yield put({ type: actionTypes.LOAD_CONFERENCE_ROOMS_SUCCESS, payload: { roomsList: response }});
      } catch (error) {
          console.error(error);

          notification['error']({
              message: 'Unable to load Conference Rooms for this office.',
              description: error.message
          });

          yield put({ type: actionTypes.LOAD_CONFERENCE_ROOMS_ERROR, payload: {error: error} });
      }
    }
