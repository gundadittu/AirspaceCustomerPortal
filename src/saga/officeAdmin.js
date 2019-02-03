import { takeLatest, call, put, select } from "redux-saga/effects";
import * as actionTypes from "../store/actions/actionTypes";
import * as selectors from './selectors';
import AirUser from '../models/AirUser';
import AirConferenceRoom from '../models/AirConferenceRoom'
import AirHotDesk from '../models/AirHotDesk'
import AirRegisteredGuest from '../models/AirRegisteredGuest'
import AirEvent from '../models/AirEvent'
import { notification } from 'antd';
require("firebase/functions");
require("firebase/storage");


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

export function* loadRegisteredGuestsWatchSaga() {
    yield takeLatest(actionTypes.LOAD_REGISTERED_GUESTS, loadRegisteredGuestsWorkerSaga);
}

export function* loadEventsWatchSaga() {
    yield takeLatest(actionTypes.LOAD_EVENTS, loadEventsWorkerSaga);
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

export function* createConferenceRoomOfficeAdmin() {
    yield takeLatest(actionTypes.ADD_CONF_ROOM, addRoomWorkerSaga);
}

export function* editConferenceRoomForOfficeAdmin() {
    yield takeLatest(actionTypes.EDIT_CONF_ROOM, editRoomWorkerSaga);
}

export function* createHotDeskOfficeAdmin() {
    yield takeLatest(actionTypes.ADD_HOT_DESK, addDeskWorkerSaga);
}

export function* editHotDeskForOfficeAdmin() {
    yield takeLatest(actionTypes.EDIT_HOT_DESK, editDeskWorkerSaga);
}

export function* getSpaceInfoForOfficeAdmin() {
    yield takeLatest(actionTypes.LOAD_SPACE_INFO, getSpaceInfoWorkerSaga);
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

    const newArray = userAdminOfficeList.map(x => {
        return (x.uid === selectedOfficeUID)
    })
    if (newArray.includes(true) === false) {
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
        yield call(createUserApiCall, payload, firebase);

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
                        if (superKey === 'active') {
                            activeConferenceRooms.push(room);
                        } else {
                            inactiveConferenceRooms.push(room);
                        }
                    }
                }
            }
            return { 'active': activeConferenceRooms, 'inactive': inactiveConferenceRooms };
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
    const apiCall = firebase.functions.httpsCallable('getAllHotDesksForOffice');

    return apiCall({ selectedOfficeUID: officeUID })
        .then(result => {
            const data = result.data;

            var activeDesks = [];
            var inactiveDesks = [];
            for (let superKey in data) {
                const superValue = data[superKey];
                for (let key in superValue) {
                    const value = superValue[key];
                    const desk = new AirHotDesk(value) || null;
                    if (desk !== null) {
                        if (superKey === 'active') {
                            activeDesks.push(desk);
                        } else {
                            inactiveDesks.push(desk);
                        }
                    }
                }
            }
            const dict = { 'active': activeDesks, 'inactive': inactiveDesks };
            return dict
        })
}

function* loadHotDesksWorkerSaga(action) {
    try {
        const selectedOfficeUID = action.payload.officeUID;
        const userAdminOfficeList = yield select(selectors.userAdminOfficeList)
        validatePermission(selectedOfficeUID, userAdminOfficeList);

        let firebase = yield select(selectors.firebase);

        const response = yield call(loadHotDesks, action.payload, firebase);
        yield put({ type: actionTypes.LOAD_HOT_DESKS_SUCCESS, payload: { activeDesksList: response.active, inactiveDesksList: response.inactive } });
    } catch (error) {
        console.error(error);

        notification['error']({
            message: 'Unable to load Hot Desks for this office.',
            description: error.message
        });

        yield put({ type: actionTypes.LOAD_HOT_DESKS_ERROR, payload: { error: error } });
    }
}

function loadRegisteredGuests(payload, firebase) {
    const officeUID = payload.officeUID || null;
    const apiCall = firebase.functions.httpsCallable('getAllRegisteredGuestsForOfficeAdmin')

    return apiCall({ selectedOfficeUID: officeUID })
        .then(result => {
            const data = result.data;
            let guestList = [];
            for (let key in data) {
                const value = data[key];
                const guest = new AirRegisteredGuest(value) || null;
                if (guest !== null) {
                    guestList.push(guest);
                }
            }
            return guestList;
        })
}

function* loadRegisteredGuestsWorkerSaga(action) {
    try {
        const selectedOfficeUID = action.payload.officeUID;
        const userAdminOfficeList = yield select(selectors.userAdminOfficeList)
        validatePermission(selectedOfficeUID, userAdminOfficeList);

        let firebase = yield select(selectors.firebase);

        const response = yield call(loadRegisteredGuests, action.payload, firebase);

        yield put({
            type: actionTypes.LOAD_REGISTERED_GUESTS_SUCCESS,
            payload: { guestList: response }
        });

    } catch (error) {
        console.error(error);

        notification['error']({
            message: 'Unable to load Registered Guests for this office.',
            description: error.message
        });

        yield put({ type: actionTypes.LOAD_REGISTERED_GUESTS_ERROR, payload: { error: error } });
    }
}

function loadEvents(payload, firebase) {
    const officeUID = payload.officeUID || null;
    const apiCall = firebase.functions.httpsCallable('getEventsForOfficeAdmin')

    return apiCall({ selectedOfficeUID: officeUID })
        .then(result => {
            const data = result.data;
            var upcomingEvents = data.upcoming;
            var pastEvents = data.past;
            let upcomingAirEvents = [];
            let pastAirEvents = [];

            upcomingEvents.map((value) => {
              const airEvent = new AirEvent(value) || null;
              upcomingAirEvents.push(airEvent);
            })
            pastEvents.map((value) => {
              const airEvent = new AirEvent(value) || null;
              pastAirEvents.push(airEvent);
            })
            return { 'upcoming': upcomingAirEvents, 'past': pastAirEvents };
        })
}

function* loadEventsWorkerSaga(action) {
    try {
        const selectedOfficeUID = action.payload.officeUID;
        const userAdminOfficeList = yield select(selectors.userAdminOfficeList)
        validatePermission(selectedOfficeUID, userAdminOfficeList);

        let firebase = yield select(selectors.firebase);

        const response = yield call(loadEvents, action.payload, firebase);
        yield put({
            type: actionTypes.LOAD_EVENTS_SUCCESS,
            payload: { upcomingEventsList: response.upcoming, pastEventsList: response.past }
        });
    } catch (error) {
        console.error(error);

        notification['error']({
            message: 'Unable to load Events for this office.',
            description: error.message
        });

        yield put({ type: actionTypes.LOAD_EVENTS_ERROR, payload: { error: error } });
    }
}

function removeOfficeUser(payload, firebase) {
    const officeUID = payload.officeUID;
    const userUID = payload.userUID;

    const apiCall = firebase.functions.httpsCallable('removeUserFromOffice')

    return apiCall({ selectedOfficeUID: officeUID, selectedUserUID: userUID })
        .then(() => {
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
        yield call(removeOfficeUser, action.payload, firebase);

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
        yield call(editOfficeUser, payload, firebase);

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


function addRoom(payload, firebase) {
    const apiCall = firebase.functions.httpsCallable('addConferenceRoomForOfficeAdmin');
    return apiCall({ ...payload, hideForm: null })
        .then(response => {
            const file = payload.photoFileObj;
            if (file) {
                const storageRef = firebase.storage.ref();
                const newRoomUID = response.data;
                const photoRef = storageRef.child('conferenceRoomImages/' + newRoomUID + '.jpg');
                return photoRef.put(file);
            } else {
                return
            }
        })
}

function* addRoomWorkerSaga(action) {
    try {
        const payload = action.payload;
        const selectedOfficeUID = payload.selectedOfficeUID;
        const userAdminOfficeList = yield select(selectors.userAdminOfficeList)
        validatePermission(selectedOfficeUID, userAdminOfficeList);

        let firebase = yield select(selectors.firebase);
        yield call(addRoom, payload, firebase);

        notification['success']({
            message: 'Successfully added conference room.'
        });

        const newPayload = { hideForm: payload.hideForm }
        yield put({ type: actionTypes.ADD_CONF_ROOM_FINISHED, payload: { ...newPayload } });
    } catch (error) {
        console.error(error);

        notification['error']({
            message: 'Unable to add conference room.',
            description: error.message
        });

        const payload = action.payload;
        const newPayload = { hideForm: payload.hideForm }
        yield put({ type: actionTypes.ADD_CONF_ROOM_FINISHED, payload: { ...newPayload } });
    }
}

function editRoom(payload, firebase) {
    const apiCall = firebase.functions.httpsCallable('editConferenceRoomForOfficeAdmin');
    return apiCall({ ...payload, hideForm: null })
        .then(response => {
            const file = payload.photoFileObj;
            if (file) {
                const storageRef = firebase.storage.ref();
                const roomUID = payload.selectedRoomUID;
                const photoRef = storageRef.child('conferenceRoomImages/' + roomUID + '.jpg');
                return photoRef.put(file);
            } else {
                return
            }
        })
}

function* editRoomWorkerSaga(action) {
    try {
        const payload = action.payload;
        const selectedOfficeUID = payload.selectedOfficeUID;
        const userAdminOfficeList = yield select(selectors.userAdminOfficeList)
        validatePermission(selectedOfficeUID, userAdminOfficeList);

        let firebase = yield select(selectors.firebase);
        yield call(editRoom, payload, firebase);

        notification['success']({
            message: 'Successfully edited conference room.'
        });

        const newPayload = { hideForm: payload.hideForm };
        yield put({ type: actionTypes.EDIT_CONF_ROOM_FINISHED, payload: { ...newPayload } });

    } catch (error) {
        console.error(error);

        notification['error']({
            message: 'Unable to edit conference room.',
            description: error.message
        });

        const payload = action.payload;
        const newPayload = { hideForm: payload.hideForm }
        yield put({ type: actionTypes.EDIT_CONF_ROOM_FINISHED, payload: { ...newPayload } });
    }

}

function addDesk(payload, firebase) {
    const apiCall = firebase.functions.httpsCallable('addHotDeskForOfficeAdmin');
    return apiCall({ ...payload, hideForm: null })
        .then(response => {
            const file = payload.photoFileObj;
            if (file) {
                const storageRef = firebase.storage.ref();
                const newDeskUID = response.data;
                const photoRef = storageRef.child('deskImages/' + newDeskUID + '.jpg');
                return photoRef.put(file);
            } else {
                return
            }
        })
}

function* addDeskWorkerSaga(action) {
    try {
        const payload = action.payload;
        const selectedOfficeUID = payload.selectedOfficeUID;
        const userAdminOfficeList = yield select(selectors.userAdminOfficeList)
        validatePermission(selectedOfficeUID, userAdminOfficeList);

        let firebase = yield select(selectors.firebase);
        yield call(addDesk, payload, firebase);

        notification['success']({
            message: 'Successfully added hot desk.'
        });

        const newPayload = { hideForm: payload.hideForm };
        yield put({ type: actionTypes.ADD_HOT_DESK_FINISHED, payload: { ...newPayload } });

    } catch (error) {
        console.error(error);

        notification['error']({
            message: 'Unable to add hot desk.',
            description: error.message
        });

        const payload = action.payload;
        const newPayload = { hideForm: payload.hideForm }
        yield put({ type: actionTypes.ADD_HOT_DESK_FINISHED, payload: { ...newPayload } });
    }
}

function editDesk(payload, firebase) {
    const apiCall = firebase.functions.httpsCallable('editHotDeskForOfficeAdmin');
    return apiCall({ ...payload, hideForm: null })
        .then(response => {
            const file = payload.photoFileObj;
            if (file) {
                const storageRef = firebase.storage.ref();
                const deskUID = payload.selectedDeskUID;
                const photoRef = storageRef.child('deskImages/' + deskUID + '.jpg');
                return photoRef.put(file);
            } else {
                return
            }
        })
}

function* editDeskWorkerSaga(action) {
    try {
        const payload = action.payload;
        const selectedOfficeUID = payload.selectedOfficeUID;
        const userAdminOfficeList = yield select(selectors.userAdminOfficeList)
        validatePermission(selectedOfficeUID, userAdminOfficeList);

        let firebase = yield select(selectors.firebase);
        yield call(editDesk, payload, firebase);

        notification['success']({
            message: 'Successfully edited hot desk.'
        });

        const newPayload = { hideForm: payload.hideForm };
        yield put({ type: actionTypes.EDIT_HOT_DESK_FINISHED, payload: { ...newPayload } });
    } catch (error) {
        console.error(error);

        notification['error']({
            message: 'Unable to edit hot desk.',
            description: error.message
        });

        const payload = action.payload;
        const newPayload = { hideForm: payload.hideForm }
        yield put({ type: actionTypes.EDIT_HOT_DESK_FINISHED, payload: { ...newPayload } });
    }
}

function getSpaceInfo(payload, firebase) { 
    const apiCall = firebase.functions.httpsCallable('getSpaceInfoForOfficeAdmin');
    return apiCall({ ...payload }) 
    .then( response => { 
        const data = response.data; 
        return data 
    })
}

function* getSpaceInfoWorkerSaga(action) { 
    try {
        const payload = action.payload;
        const selectedOfficeUID = payload.selectedOfficeUID;
        const userAdminOfficeList = yield select(selectors.userAdminOfficeList)
        validatePermission(selectedOfficeUID, userAdminOfficeList);

        let firebase = yield select(selectors.firebase);
        const response = yield call(getSpaceInfo, payload, firebase);

        yield put({ type: actionTypes.LOAD_SPACE_INFO_FINISHED, payload: { onboardingURL: response.onboardingURL, floorplanURL: response.floorplanURL, buildingDetailsURL: response.buildingDetailsURL } });
    } catch (error) {
        console.error(error);

        notification['error']({
            message: 'Unable to load space info for this office.',
            description: error.message
        });

        yield put({ type: actionTypes.LOAD_SPACE_INFO_FINISHED_ERROR });
    }
}