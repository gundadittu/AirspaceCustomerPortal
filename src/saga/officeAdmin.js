import { takeLatest, call, put, select } from "redux-saga/effects";
import * as actionTypes from "../store/actions/actionTypes";
import * as selectors from './selectors';
import AirUser from '../models/AirUser';
import AirConferenceRoom from '../models/AirConferenceRoom'
import AirHotDesk from '../models/AirHotDesk'
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

export function* loadHotDesksWatchSaga() {
    yield takeLatest(actionTypes.LOAD_HOT_DESKS, loadHotDesksWorkerSaga);
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

function validatePermission(selectedOfficeUID, userAdminOfficeList) {

    if (userAdminOfficeList == null) {
        notification['error']({
            message: 'Permission denied.',
            description: 'Current user is not a admin for this office.'
        });
        throw new Error('Current user is not a admin for this office..');
    }

    const newArray = userAdminOfficeList.map(x => {
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
    const dict = { firstName: firstName, lastName: lastName, email: email, makeUserOfficeAdmin: makeUserOfficeAdmin, selectedOfficeUID: selectedOfficeUID, type: type };

    const apiCall = firebase.functions.httpsCallable('addUserToOffice');
    return apiCall(dict)
        .then(result => {
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
        yield put({ type: actionTypes.CREATE_USER_FOR_OFFICEADMIN_FINISHED, payload: { ...newPayload } })
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

    return apiCall({ officeUID: officeUID })
        .then(result => {
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
        yield put({ type: actionTypes.LOAD_OFFICE_USERS_SUCCESS, payload: { userList: response } });
    } catch (error) {
        console.error(error);

        notification['error']({
            message: 'Unable to load Users for this office.',
            description: error.message
        });

        yield put({ type: actionTypes.LOAD_OFFICE_USERS_ERROR, payload: { error: error } });
    }
}

function loadConferenceRooms(payload, firebase) {
    const officeUID = payload.officeUID || null;
    const apiCall = firebase.functions.httpsCallable('getAllConferenceRoomsForOffice')

    return apiCall({ selectedOfficeUID: officeUID })
        .then(result => {
            const data = result.data;

            var activeConferenceRooms = [];
            var inactiveConferenceRooms = [];
            for (let superKey in data) {
                const superValue = data[superKey];
                for (let key in superValue) {
                    const value = superValue[key];
                    const room = new AirConferenceRoom(value) || null;
                    if (room !== null) {
                        if (superKey == 'active') {
                            activeConferenceRooms.push(room);
                        } else {
                            inactiveConferenceRooms.push(room);
                        }
                    }
                }
            }
            return {'active': activeConferenceRooms, 'inactive': inactiveConferenceRooms};
        })
}

function* loadConferenceRoomsWorkerSaga(action) {
    try {
        const selectedOfficeUID = action.payload.officeUID;
        const userAdminOfficeList = yield select(selectors.userAdminOfficeList)
        validatePermission(selectedOfficeUID, userAdminOfficeList);

        let firebase = yield select(selectors.firebase);

        const response = yield call(loadConferenceRooms, action.payload, firebase);
        yield put({ type: actionTypes.LOAD_CONFERENCE_ROOMS_SUCCESS, payload: { activeRoomsList: response.active, inactiveRoomsList: response.inactive } });
    } catch (error) {
        console.error(error);

        notification['error']({
            message: 'Unable to load Conference Rooms for this office.',
            description: error.message
        });

        yield put({ type: actionTypes.LOAD_CONFERENCE_ROOMS_ERROR, payload: { error: error } });
    }
}

    function loadHotDesks(payload, firebase) {
        const officeUID = payload.officeUID || null;
        const apiCall = firebase.functions.httpsCallable('getAllHotDesksForUser')

        return apiCall({officeUID: officeUID})
        .then( result => {
            const data = result.data;

            var hotDesks = [];
            for (let key in data) {
              const value = data[key];
              const desk = new AirHotDesk(value) || null;
              if (desk !== null) {
                hotDesks.push(desk)
              }
            }
            return hotDesks;
        })
    }

    function* loadHotDesksWorkerSaga(action) {
        try {
            const selectedOfficeUID = action.payload.officeUID;
            const userAdminOfficeList = yield select(selectors.userAdminOfficeList)
            validatePermission(selectedOfficeUID, userAdminOfficeList);

            let firebase = yield select(selectors.firebase);

            const response = yield call(loadHotDesks, action.payload, firebase);
            yield put({ type: actionTypes.LOAD_HOT_DESKS_SUCCESS, payload: { desksList: response }});
        } catch (error) {
            console.error(error);

            notification['error']({
                message: 'Unable to load Hot Desks for this office.',
                description: error.message
            });

            yield put({ type: actionTypes.LOAD_HOT_DESKS_ERROR, payload: {error: error} });
        }
      }

  function removeOfficeUser(payload, firebase) {
    const officeUID = payload.officeUID;
    const userUID = payload.userUID;

    const apiCall = firebase.functions.httpsCallable('removeUserFromOffice')

    return apiCall({ selectedOfficeUID: officeUID, selectedUserUID: userUID })
        .then(() => {
            console.log('removeUserApiCall-success');
            return null
        })
}

function* removeUserWorkerSaga(action) {
    try {
        const payload = action.payload;
        const selectedOfficeUID = payload.officeUID;
        const userAdminOfficeList = yield select(selectors.userAdminOfficeList)
        validatePermission(selectedOfficeUID, userAdminOfficeList);

        let firebase = yield select(selectors.firebase);
        const response = yield call(removeOfficeUser, action.payload, firebase);

        notification['success']({
            message: 'Successfully removed user from this office.'
        });

        const newPayload = { componentRef: payload.componentRef }
        yield put({ type: actionTypes.REMOVE_OFFICE_USER_FINISHED, payload: { ...newPayload } });
    } catch (error) {
        console.error(error);

        notification['error']({
            message: 'Unable to remove user from this office.',
            description: error.message
        });

        const payload = action.payload;
        const newPayload = { componentRef: payload.componentRef, formRef: payload.formRef }
        yield put({ type: actionTypes.REMOVE_OFFICE_USER_FINISHED, payload: { ...newPayload, error: error } });
    }
}

function editOfficeUser(payload, firebase) {
    const apiCall = firebase.functions.httpsCallable('editUserForOffice')
    return apiCall({ ...payload })
        .then(() => {
            console.log('editUserApiCall-success');
            return null
        })
}

function* editUserWorkerSaga(action) {
    try {
        const payload = action.payload;
        const selectedOfficeUID = payload.selectedOfficeUID;
        const userAdminOfficeList = yield select(selectors.userAdminOfficeList)
        validatePermission(selectedOfficeUID, userAdminOfficeList);

        let firebase = yield select(selectors.firebase);
        const response = yield call(editOfficeUser, payload, firebase);

        notification['success']({
            message: 'Successfully edited user info.'
        });

        const newPayload = { hideForm: payload.hideForm }
        yield put({ type: actionTypes.EDIT_OFFICE_USER_FINISHED, payload: { ...newPayload } });
    } catch (error) {
        console.error(error);

        notification['error']({
            message: 'Unable to update user info.',
            description: error.message
        });

        const payload = action.payload;
        const newPayload = { hideForm: payload.hideForm }
        yield put({ type: actionTypes.EDIT_OFFICE_USER_FINISHED, payload: { ...newPayload } });
    }
}
