import { takeLatest, call, put, select } from "redux-saga/effects";
import * as actionTypes from "../store/actions/actionTypes";
import * as selectors from './selectors';
import AirUser from '../models/AirUser';
import AirConferenceRoom from '../models/AirConferenceRoom'
import AirHotDesk from '../models/AirHotDesk'
import AirRegisteredGuest from '../models/AirRegisteredGuest'
import AirEvent from '../models/AirEvent'
import AirServiceRequest from '../models/AirServiceRequest'
import AirAnnouncement from '../models/AirAnnouncement'
import { notification } from 'antd';
import * as sentry from '@sentry/browser';
require("firebase/functions");
require("firebase/storage");

// Watchers

export function* sendPasswordResetWatcher() {
    yield takeLatest(actionTypes.SEND_PASSWORD_RESET, sendPasswordResetWorkerSaga);
}

export function* acceptServiceOptionWatcher() {
    yield takeLatest(actionTypes.ACCEPT_SERVICE_OPTION, acceptServiceOptionWorkerSaga);
}

export function* pendingServiceOptionWatcher() {
    yield takeLatest(actionTypes.PENDING_SERVICE_OPTION, pendingServiceOptionWorkerSaga);
}

export function* confirmPendingPackageWatcher() {
    yield takeLatest(actionTypes.CONFIRM_PENDING_PACKAGE, confirmPendingPackageWorkerSaga);
}

export function* rejectPendingPackageWatcher() {
    yield takeLatest(actionTypes.REJECT_PENDING_PACKAGE, rejectPendingPackageWorkerSaga);
}

// export function* acceptServiceAddOnWatcher() {
//     yield takeLatest(actionTypes.ACCEPT_SERVICE_ADDON, acceptServiceAddOnWorkerSaga);
// }

// export function* pendingServiceAddOnWatcher() {
//     yield takeLatest(actionTypes.PENDING_SERVICE_ADDON, pendingServiceAddOnWorkerSaga);
// }

export function* getServicePlanForOfficeNoLoad() {
    yield takeLatest(actionTypes.GET_SERVICE_PLAN_FOR_OFFICE_NO_LOAD, getServicePlanForOfficeWorkerSaga);
}

export function* addRequestService() {
    yield takeLatest(actionTypes.ADD_REQUEST_SERVICE, addRequestForServiceWorkerSaga);
}

export function* submitSupportTicketWatcher() {
    yield takeLatest(actionTypes.SUBMIT_SERVICE_TICKET, submitSupportTicketWorkerSaga);
}

export function* loadOfficeProfile() {
    yield takeLatest(actionTypes.LOAD_OFFICE_PROFILE, loadOfficeProfileWorkerSaga);
}

export function* updateOfficeProfile() {
    yield takeLatest(actionTypes.UPDATE_OFFICE_PROFILE, updateOfficeProfileWorkerSaga);
}

export function* uploadAttachmentOfficeProfile() {
    yield takeLatest(actionTypes.UPLOAD_ATTACHMENT_OFFICE_PROFILE, uploadAttachmentOfficeProfileWorkerSaga);
}

export function* checkValidEmailWatcher() {
    yield takeLatest(actionTypes.CHECK_VALID_EMAIL, checkValidEmailWorkerSaga);
}

export function* getEMInfo() {
    yield takeLatest(actionTypes.LOAD_EM_INFO, getEmInfoForOfficeWorkerSaga);
}

export function* getServicePlanForOffice() {
    yield takeLatest(actionTypes.GET_SERVICE_PLAN_FOR_OFFICE, getServicePlanForOfficeWorkerSaga);
}

export function* submitGetStartedData() {
    yield takeLatest(actionTypes.SUBMIT_GET_STARTED_DATA, submitGetStartedDataWorkerSaga);
}

export function* loadOfficeUsersWatchSaga() {
    yield takeLatest(actionTypes.LOAD_OFFICE_USERS, loadOfficeUsersWorkerSaga);
}

export function* loadAdminAnnouncementsWatchSaga() {
    yield takeLatest(actionTypes.LOAD_ADMIN_ANNOUNCEMENTS, loadAdminAnnouncementsWorkerSaga);
}

export function* postAdminAnnouncementWatchSaga() {
    yield takeLatest(actionTypes.POST_ADMIN_ANNOUNCEMENT, postAdminAnnouncementWorkerSaga);
}

export function* loadConferenceRoomsWatchSaga() {
    yield takeLatest(actionTypes.LOAD_CONFERENCE_ROOMS, loadConferenceRoomsWorkerSaga);
}

export function* loadHotDesksWatchSaga() {
    yield takeLatest(actionTypes.LOAD_HOT_DESKS, loadHotDesksWorkerSaga);
}

export function* loadServiceRequestsWatchSaga() {
    yield takeLatest(actionTypes.LOAD_SERVICE_REQUESTS, loadServiceRequestsWorkerSaga);
}

export function* loadServiceRequestsEmailsWatchSaga() {
    yield takeLatest(actionTypes.LOAD_SERVICE_REQUESTS_EMAILS, loadServiceRequestsEmailsWorkerSaga);
}

export function* editServiceRequestsEmailsWatchSaga() {
    yield takeLatest(actionTypes.EDIT_SERVICE_REQUESTS_EMAILS, editServiceRequestsEmailsWorkerSaga);
}

export function* editServiceRequestsStatusWatchSaga() {
    yield takeLatest(actionTypes.EDIT_SERVICE_REQUESTS_STATUS, editServiceRequestsStatusWorkerSaga);
}

export function* loadRegisteredGuestsWatchSaga() {
    yield takeLatest(actionTypes.LOAD_REGISTERED_GUESTS, loadRegisteredGuestsWorkerSaga);
}

export function* editRegisteredGuestStatusForOfficeAdminWatchSaga() {
    yield takeLatest(actionTypes.EDIT_REGISTERED_GUESTS_STATUS, editRegisteredGuestStatusForOfficeAdminWorkerSaga);
}

export function* guestSelfCheckInWatchSaga() {
    yield takeLatest(actionTypes.GUEST_SELF_CHECK_IN_STATUS, guestSelfCheckInWorkerSaga);
}

export function* loadEventsWatchSaga() {
    yield takeLatest(actionTypes.LOAD_EVENTS, loadEventsWorkerSaga);
}

export function* createEventsWatchSaga() {
    yield takeLatest(actionTypes.CREATE_EVENT, createEventWorkerSaga);
}

export function* editEventsWatchSaga() {
    yield takeLatest(actionTypes.EDIT_EVENT, editEventWorkerSaga);
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

export function* getAllInvoicesForOffice() {
    yield takeLatest(actionTypes.GET_ALL_INVOICES_FOR_OFFICE, getAllInvoicesForOfficeWorkerSaga);
}

export function* loadOfficeReportWatcher() {
    yield takeLatest(actionTypes.LOAD_OFFICE_REPORT, loadOfficeReportWorkerSaga);
}
// Workers

function loadOfficeReport(payload, firebase) {
    const apiCall = firebase.functions.httpsCallable('getOfficeReport')
    return apiCall(payload)
        .then(result => {
            const data = result.data;
            return data;
        })
}

function* loadOfficeReportWorkerSaga(action) {

    try {
        let firebase = yield select(selectors.firebase);
        const payload = action.payload || {};
        const response = yield call(loadOfficeReport, payload, firebase);
        yield put({ type: actionTypes.LOAD_OFFICE_REPORT_FINISHED, payload: { report: response } });
    } catch (error) {
        sentry.captureException(error);
        notification['error']({
            message: 'Unable to load office report.',
            // description: error.message
        });
        yield put({ type: actionTypes.LOAD_OFFICE_REPORT_FINISHED, payload: { report: null } });
    }

}

function validatePermission(selectedOfficeUID, userAdminOfficeList) {
    if (userAdminOfficeList == null) {
        notification['error']({
            message: 'Permission denied.',
            // description: 'Current user is not a admin for this office.'
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
            // description: ''
        });

        const newPayload = { hideFormRef: payload.hideFormRef }
        yield put({ type: actionTypes.CREATE_USER_FOR_OFFICEADMIN_FINISHED, payload: { ...newPayload } })
    } catch (error) {
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to add user.',
            // description: error.message
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
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to load Users for this office.',
            // description: error.message
        });

        yield put({ type: actionTypes.LOAD_OFFICE_USERS_ERROR, payload: { error: error } });
    }
}

function loadAdminAnnouncements(payload, firebase) {
    const selectedOfficeUID = payload.selectedOfficeUID;
    const apiCall = firebase.functions.httpsCallable('getAnnouncementsForOfficeAdmin')
    const dict = {
        selectedOfficeUID: selectedOfficeUID
    }
    return apiCall({ selectedOfficeUID: selectedOfficeUID })
        .then(result => {
            var announcements = []
            result.data.map(announcement => {
                var newAnnouncement = new AirAnnouncement(announcement) || null
                if (newAnnouncement !== null && newAnnouncement.uid) {
                    announcements.push(newAnnouncement);
                }
            })
            return announcements;
        })
}

function* loadAdminAnnouncementsWorkerSaga(action) {
    try {
        const payload = action.payload;
        const selectedOfficeUID = payload.selectedOfficeUID;
        const userAdminOfficeList = yield select(selectors.userAdminOfficeList)

        validatePermission(selectedOfficeUID, userAdminOfficeList);
        let firebase = yield select(selectors.firebase);
        const response = yield call(loadAdminAnnouncements, action.payload, firebase);
        yield put({ type: actionTypes.LOAD_ADMIN_ANNOUNCEMENTS_SUCCESS, payload: { announcements: response } });
    } catch (error) {
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to load Announcements for this office.',
            // description: error.message
        });

        yield put({ type: actionTypes.LOAD_ADMIN_ANNOUNCEMENTS_ERROR, payload: { error: error } });
    }
}


function postAnnouncement(payload, firebase) {
    const selectedOfficeUID = payload.selectedOfficeUID;
    const message = payload.message;
    const dict = { selectedOfficeUID: selectedOfficeUID, message: message };

    const apiCall = firebase.functions.httpsCallable('postAnnouncementForOfficeAdmin');
    return apiCall(dict)
        .then(response => {
        })
}

function* postAdminAnnouncementWorkerSaga(action) {
    try {
        const payload = action.payload;
        const selectedOfficeUID = payload.selectedOfficeUID;
        const userAdminOfficeList = yield select(selectors.userAdminOfficeList)
        validatePermission(selectedOfficeUID, userAdminOfficeList);

        let firebase = yield select(selectors.firebase);

        const response = yield call(postAnnouncement, action.payload, firebase);

        notification['success']({
            message: 'Successfully posted announcement.',
            // description: null
        });

        const newPayload = {}
        yield put({ type: actionTypes.POST_ADMIN_ANNOUNCEMENT_SUCCESS, payload: { ...newPayload } });
    } catch (error) {
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to post announcement for this office.',
            // description: error.message
        });

        const payload = action.payload;
        const newPayload = {}
        yield put({ type: actionTypes.POST_ADMIN_ANNOUNCEMENT_ERROR, payload: { ...newPayload } });
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
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to load Conference Rooms for this office.',
            // description: error.message
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
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to load Hot Desks for this office.',
            // description: error.message
        });

        yield put({ type: actionTypes.LOAD_HOT_DESKS_ERROR, payload: { error: error } });
    }
}

function loadServiceRequests(payload, firebase) {
    const officeUID = payload.officeUID || null;
    const apiCall = firebase.functions.httpsCallable('getAllServiceRequestsForOfficeAdmin');
    return apiCall({ selectedOfficeUID: officeUID })
        .then(result => {
            const data = result.data;
            var requests = [];
            for (var i = 0; i < data.length; i++) {
                var newData = new AirServiceRequest(data[i])
                requests.push(newData)
            }

            const dict = { 'serviceRequests': requests };
            return dict
        })
}

function* loadServiceRequestsWorkerSaga(action) {
    try {
        const selectedOfficeUID = action.payload.officeUID;
        const userAdminOfficeList = yield select(selectors.userAdminOfficeList)
        validatePermission(selectedOfficeUID, userAdminOfficeList);

        let firebase = yield select(selectors.firebase);

        const response = yield call(loadServiceRequests, action.payload, firebase);
        yield put({ type: actionTypes.LOAD_SERVICE_REQUESTS_SUCCESS, payload: { serviceRequestsList: response.serviceRequests } });
    } catch (error) {
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to load Service Requests for this office.',
            // description: error.message
        });

        yield put({ type: actionTypes.LOAD_SERVICE_REQUESTS_ERROR, payload: { error: error } });
    }
}

function loadServiceRequestEmails(payload, firebase) {
    const officeUID = payload.officeUID || null;
    const apiCall = firebase.functions.httpsCallable('getServiceRequestAutoRoutingForOfficeAdmin');
    return apiCall({ selectedOfficeUID: officeUID })
        .then(result => {
            const data = result.data;
            const dict = { 'serviceRequestsEmails': data };
            return dict
        })
}

function* loadServiceRequestsEmailsWorkerSaga(action) {
    try {
        const selectedOfficeUID = action.payload.officeUID;
        const userAdminOfficeList = yield select(selectors.userAdminOfficeList)
        validatePermission(selectedOfficeUID, userAdminOfficeList);

        let firebase = yield select(selectors.firebase);

        const response = yield call(loadServiceRequestEmails, action.payload, firebase);
        yield put({ type: actionTypes.LOAD_SERVICE_REQUESTS_EMAILS_SUCCESS, payload: { serviceEmailsList: response.serviceRequestsEmails } });
    } catch (error) {
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to load Service Requests Emails for this office.',
            // description: error.message
        });

        yield put({ type: actionTypes.LOAD_SERVICE_REQUESTS_ERROR, payload: { error: error } });
    }
}

function editEmails(payload, firebase) {
    const selectedOfficeUID = payload.selectedOfficeUID;
    const updatedEmails = payload.updatedEmails;
    const dict = {
        selectedOfficeUID: selectedOfficeUID,
        updatedEmails: updatedEmails
    }

    const apiCall = firebase.functions.httpsCallable('updateServiceRequestAutoRoutingForOfficeAdmin');
    return apiCall(dict)
        .then(response => {
        })
}

function* editServiceRequestsEmailsWorkerSaga(action) {
    try {
        const payload = action.payload;
        const selectedOfficeUID = payload.selectedOfficeUID;
        const userAdminOfficeList = yield select(selectors.userAdminOfficeList)
        validatePermission(selectedOfficeUID, userAdminOfficeList);

        let firebase = yield select(selectors.firebase);

        const response = yield call(editEmails, action.payload, firebase);

        notification['success']({
            message: 'Successfully edited emails.',
            // description: null
        });
        const newPayload = { hideForm: payload.hideForm }
        yield put({ type: actionTypes.EDIT_SERVICE_REQUESTS_EMAILS_SUCCESS, payload: { ...newPayload } });
    } catch (error) {
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to edit emails for this office.',
            // description: error.message
        });

        const payload = action.payload;
        const newPayload = { hideForm: payload.hideForm }
        yield put({ type: actionTypes.EDIT_SERVICE_REQUESTS_EMAILS_ERROR, payload: { ...newPayload } });
    }
}

function editStatus(payload, firebase) {
    const selectedServiceRequestUID = payload.selectedServiceRequestUID;
    const newStatus = payload.newStatus;
    const dict = {
        selectedServiceRequestUID: selectedServiceRequestUID,
        newStatus: newStatus
    }
    const apiCall = firebase.functions.httpsCallable('updateServiceRequestStatusForOfficeAdmin');
    return apiCall(dict)
        .then(response => {
        })
}

function* editServiceRequestsStatusWorkerSaga(action) {
    try {
        const payload = action.payload;
        let firebase = yield select(selectors.firebase);

        const response = yield call(editStatus, action.payload, firebase);

        notification['success']({
            message: 'Successfully edited service request status.',
            // description: null
        });

        const newPayload = { hideForm: payload.hideForm }
        yield put({ type: actionTypes.EDIT_SERVICE_REQUESTS_STATUS_SUCCESS, payload: { ...newPayload } });
    } catch (error) {
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to edit status for this office.',
            // description: error.message
        });

        const payload = action.payload;
        const newPayload = { hideForm: payload.hideForm }
        yield put({ type: actionTypes.EDIT_SERVICE_REQUESTS_STATUS_ERROR, payload: { ...newPayload } });
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
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to load Registered Guests for this office.',
            // description: error.message
        });

        yield put({ type: actionTypes.LOAD_REGISTERED_GUESTS_ERROR, payload: { error: error } });
    }
}


function changeRegisteredGuestsStatus(payload, firebase) {
    const registeredGuestUID = payload.registeredGuestUID;
    const newStatus = payload.newArrivalStatus;

    const dict = {
        registeredGuestUID: registeredGuestUID,
        newArrivalStatus: newStatus
    }
    const apiCall = firebase.functions.httpsCallable('changeRegisteredGuestStatusForOfficeAdmin');
    return apiCall(dict)
        .then(response => {
        })
}

function* editRegisteredGuestStatusForOfficeAdminWorkerSaga(action) {
    try {
        const payload = action.payload;
        let firebase = yield select(selectors.firebase);
        const response = yield call(changeRegisteredGuestsStatus, action.payload, firebase);

        notification['success']({
            message: 'Successfully changed the arrival status of your guest.',
            // description: null
        });

        const newPayload = { hideForm: payload.hideForm }
        yield put({ type: actionTypes.EDIT_REGISTERED_GUESTS_STATUS_SUCCESS, payload: { ...newPayload } });
    } catch (error) {
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to change the arrival status of your guest.',
            // description: error.message
        });

        const payload = action.payload;
        const newPayload = { hideForm: payload.hideForm }
        yield put({ type: actionTypes.EDIT_REGISTERED_GUESTS_STATUS_ERROR, payload: { ...newPayload } });
    }
}

function guestSelfCheckIn(payload, firebase) {
    const registeredGuestUID = payload.registeredGuestUID;

    const dict = {
        registeredGuestUID: registeredGuestUID,
    }
    const apiCall = firebase.functions.httpsCallable('guestSelfCheckIn');
    return apiCall(dict)
        .then(response => {
        })
}

function* guestSelfCheckInWorkerSaga(action) {
    try {
        const payload = action.payload;
        let firebase = yield select(selectors.firebase);
        const response = yield call(guestSelfCheckIn, action.payload, firebase);

        notification['success']({
            message: 'Successfully checked in.',
            description: null
        });

        yield put({ type: actionTypes.GUEST_SELF_CHECK_IN_STATUS_SUCCESS, payload: {} });
    } catch (error) {
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to check you in.',
            // description: error.message
        });

        const payload = action.payload;
        yield put({ type: actionTypes.GUEST_SELF_CHECK_IN_STATUS_ERROR, payload: {} });
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
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to load Events for this office.',
            // description: error.message
        });

        yield put({ type: actionTypes.LOAD_EVENTS_ERROR, payload: { error: error } });
    }
}

function createEvent(payload, firebase) {
    const selectedOfficeUID = payload.selectedOfficeUID;
    const title = payload.eventTitle;
    const description = payload.description;
    const startDate = payload.startDate.toUTCString();
    const endDate = payload.endDate.toUTCString();
    const address = payload.address || null; 
    
    const dict = { selectedOfficeUID: selectedOfficeUID, title: title, description: description, startDate: startDate, endDate: endDate, address: address };

    const apiCall = firebase.functions.httpsCallable('createEventForOfficeAdmin');
    return apiCall(dict)
        .then(response => {
            const eventUID = response.data;
            const file = payload.photoFileObj;
            if (file && eventUID) {
                const storageRef = firebase.storage.ref();
                const photoRef = storageRef.child('eventPhotos/' + eventUID + '.jpg');
                return photoRef.put(file);
            } else {
                return
            }
        })
}

function* createEventWorkerSaga(action) {
    try {
        const payload = action.payload;
        const selectedOfficeUID = payload.selectedOfficeUID;
        const userAdminOfficeList = yield select(selectors.userAdminOfficeList)
        validatePermission(selectedOfficeUID, userAdminOfficeList);

        let firebase = yield select(selectors.firebase);

        const response = yield call(createEvent, action.payload, firebase);

        notification['success']({
            message: 'Successfully created event.',
            // description: null
        });

        const newPayload = { hideForm: payload.hideForm }
        yield put({ type: actionTypes.CREATE_EVENT_FINISHED, payload: { ...newPayload } });
    } catch (error) {
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to create event for this office.',
            // description: error.message
        });

        const payload = action.payload;
        const newPayload = { hideForm: payload.hideForm }
        yield put({ type: actionTypes.CREATE_EVENT_FINISHED, payload: { ...newPayload } });
    }
}

function editEvent(payload, firebase) {
    const selectedEventUID = payload.selectedEventUID;
    const title = payload.eventTitle;
    const description = payload.description;
    const address = payload.address || null;

    let startDate = payload.startDate;
    if (startDate) {
        startDate = startDate.toUTCString();
    }
    let endDate = payload.endDate
    if (endDate) {
        endDate = endDate.toUTCString();
    }
    const canceled = payload.canceled;
    const dict = { selectedEventUID: selectedEventUID, title: title, description: description, startDate: startDate, endDate: endDate, canceled: canceled, address: address };

    const apiCall = firebase.functions.httpsCallable('editEventsForOfficeAdmin');
    return apiCall(dict)
        .then(response => {
            const eventUID = selectedEventUID;
            const file = payload.photoFileObj;
            if (file && eventUID) {
                const storageRef = firebase.storage.ref();
                const photoRef = storageRef.child('eventPhotos/' + eventUID + '.jpg');
                return photoRef.put(file);
            } else {
                return
            }
        })
}

function* editEventWorkerSaga(action) {
    try {
        const payload = action.payload;
        const selectedOfficeUID = payload.selectedOfficeUID;
        const userAdminOfficeList = yield select(selectors.userAdminOfficeList)
        const requestCancel = payload.requestCancel;
        validatePermission(selectedOfficeUID, userAdminOfficeList);

        let firebase = yield select(selectors.firebase);

        const response = yield call(editEvent, action.payload, firebase);

        const notificationMessage = 'Successfully edited event.';
        if (requestCancel) {
            notificationMessage = 'Successfully canceled event.'
        }
        notification['success']({
            message: notificationMessage,
            // description: null
        });

        const newPayload = { hideForm: payload.hideForm }
        yield put({ type: actionTypes.EDIT_EVENT_FINISHED, payload: { ...newPayload } });
    } catch (error) {
        sentry.captureException(error);

        console.error(error);
        console.log("edit event failed");

        notification['error']({
            message: 'Unable to edit event for this office.',
            // description: error.message
        });

        const payload = action.payload;
        const newPayload = { hideForm: payload.hideForm }
        yield put({ type: actionTypes.EDIT_EVENT_FINISHED, payload: { ...newPayload } });
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
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to remove user from this office.',
            // description: error.message
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
        sentry.captureException(error);
        notification['error']({
            message: 'Unable to update user info.',
            // description: error.message
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
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to add conference room.',
            // description: error.message
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
        sentry.captureException(error);
        notification['error']({
            message: 'Unable to edit conference room.',
            // description: error.message
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
        sentry.captureException(error);
        notification['error']({
            message: 'Unable to add hot desk.',
            // description: error.message
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
        sentry.captureException(error);
        notification['error']({
            message: 'Unable to edit hot desk.',
            // description: error.message
        });

        const payload = action.payload;
        const newPayload = { hideForm: payload.hideForm }
        yield put({ type: actionTypes.EDIT_HOT_DESK_FINISHED, payload: { ...newPayload } });
    }
}

function getSpaceInfo(payload, firebase) {
    const apiCall = firebase.functions.httpsCallable('getSpaceInfoForOfficeAdmin');
    return apiCall({ ...payload })
        .then(response => {
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
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to load space info for this office.',
            // description: error.message
        });

        yield put({ type: actionTypes.LOAD_SPACE_INFO_FINISHED_ERROR });
    }
}

function submitGSData(payload, firebase) {
    const apiCall = firebase.functions.httpsCallable('getStartedFormNew');
    return apiCall({ ...payload })
        .then(response => {
            const data = response.data;
            return
        })
}


function* submitGetStartedDataWorkerSaga(action) {
    try {
        const payload = action.payload;

        let firebase = yield select(selectors.firebase);
        const response = yield call(submitGSData, payload, firebase);

        yield put({ type: actionTypes.SUBMIT_GET_STARTED_DATA_FINISHED_SUCCESS });
    } catch (error) {
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to submit your data.',
            // description: error.message
        });

        yield put({ type: actionTypes.SUBMIT_GET_STARTED_DATA_FINISHED_ERROR });
    }
}

function getInvoices(payload, firebase) {
    const apiCall = firebase.functions.httpsCallable('getAllInvoicesForOffice');
    return apiCall({ ...payload })
        .then(response => {
            const data = response.data;
            return data;
        })
}

function* getAllInvoicesForOfficeWorkerSaga(action) {
    try {
        const payload = action.payload;

        let firebase = yield select(selectors.firebase);
        const response = yield call(getInvoices, payload, firebase);

        yield put({ type: actionTypes.GET_ALL_INVOICES_FOR_OFFICE_FINISHED, payload: { invoices: response.all, outstanding: response.outstanding, paid: response.paid } });
    } catch (error) {
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to get invoices.',
            // description: error.message
        });

        yield put({ type: actionTypes.GET_ALL_INVOICES_FOR_OFFICE_FINISHED, payload: { invoices: null, outstanding: null, paid: null } });
    }
}

function getServicePlan(payload, firebase) {
    const apiCall = firebase.functions.httpsCallable('getServicePlanForOffice');
    return apiCall({ ...payload })
        .then(response => {
            const data = response.data;
            return data;
        })
}

function* getServicePlanForOfficeWorkerSaga(action) {
    try {
        const payload = action.payload;
        let firebase = yield select(selectors.firebase);
        const response = yield call(getServicePlan, payload, firebase);

        if (response === null) {
            yield put({ type: actionTypes.GET_SERVICE_PLAN_FOR_OFFICE_FINISHED, payload: { active: null, inactive: null } });
            return
        }
        yield put({ type: actionTypes.GET_SERVICE_PLAN_FOR_OFFICE_FINISHED, payload: { active: response.active || [], inactive: response.inactive || [], pending: response.pending || [] } });
    } catch (error) {
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to get service plan.',
            // description: error.message
        });

        yield put({ type: actionTypes.GET_SERVICE_PLAN_FOR_OFFICE_FINISHED, payload: { active: null, inactive: null } });
    }
}

function getEmInfo(payload, firebase) {
    const call = firebase.functions.httpsCallable('getPendingPackages');
    call({ selectedOfficeUID: payload.selectedOfficeUID })
        .then(response => {
            return
        })
        .catch(err => {
            console.error(err);
            return
        })

    const apiCall = firebase.functions.httpsCallable('getExperienceManagerInfoForOffice');
    return apiCall({ ...payload })
        .then(response => {
            const data = response.data;
            return data;
        })
}

function* getEmInfoForOfficeWorkerSaga(action) {
    try {
        const payload = action.payload;
        let firebase = yield select(selectors.firebase);
        const response = yield call(getEmInfo, payload, firebase);

        yield put({ type: actionTypes.LOAD_EM_INFO_FINISHED, payload: { info: response } });
    } catch (error) {
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to load experience manager info.',
            // description: error.message
        });

        yield put({ type: actionTypes.LOAD_EM_INFO_FINISHED, payload: { info: null } });
    }
}

function loadOfficeProfileForAdmin(payload, firebase) {
    const apiCall = firebase.functions.httpsCallable('getOfficeProfileForAdmin');
    return apiCall({ ...payload })
        .then(response => {
            const data = response.data;
            return data;
        })
}

function* loadOfficeProfileWorkerSaga(action) {
    try {
        const payload = action.payload;
        let firebase = yield select(selectors.firebase);
        const response = yield call(loadOfficeProfileForAdmin, payload, firebase);

        yield put({ type: actionTypes.LOAD_OFFICE_PROFILE_FINISHED, payload: { info: response } });
    } catch (error) {
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to load office profile info.',
            // description: error.message
        });

        yield put({ type: actionTypes.LOAD_OFFICE_PROFILE_FINISHED, payload: { info: null } });
    }
}

function uploadAttachmentOfficeProfileForAdmin(payload, firebase) {
    const apiCall = firebase.functions.httpsCallable('uploadAttachmentOfficeProfileForAdmin');
    return apiCall({ ...payload })
        .then(response => {
            return
        })
}

function* uploadAttachmentOfficeProfileWorkerSaga(action) {
    try {
        const payload = action.payload;
        let firebase = yield select(selectors.firebase);

        notification['info']({
            message: 'Hold on...',
            description: 'We are trying to upload your file.',
        });

        const response = yield call(uploadAttachmentOfficeProfileForAdmin, payload, firebase);

        notification['success']({
            message: 'Your file was uploaded successfully.',
        });

        yield put({ type: actionTypes.LOAD_OFFICE_PROFILE, payload: { ...payload, noLoad: true } });

        yield put({ type: actionTypes.UPLOAD_ATTACHMENT_OFFICE_PROFILE_FINISHED });
    } catch (error) {
        sentry.captureException(error);

        const payload = action.payload;

        notification['error']({
            message: 'Unable to upload your file.',
        });

        yield put({ type: actionTypes.LOAD_OFFICE_PROFILE, payload: { ...payload, noLoad: true } });

        yield put({ type: actionTypes.UPLOAD_ATTACHMENT_OFFICE_PROFILE_FINISHED });
    }
}

function updateOfficeProfileForAdmin(payload, firebase) {
    const apiCall = firebase.functions.httpsCallable('updateOfficeProfileForAdmin');
    return apiCall({ ...payload })
        .then(response => {
            const data = response.data;
            return data;
        })
}

function* updateOfficeProfileWorkerSaga(action) {
    try {
        const payload = action.payload;
        let firebase = yield select(selectors.firebase);

        notification['info']({
            message: 'Hold on...',
            description: 'We are trying to save your changes',
            duration: 1
        });

        const response = yield call(updateOfficeProfileForAdmin, payload, firebase);

        notification['success']({
            message: 'Your changes were saved.',
            // description: error.message
        });

        yield put({ type: actionTypes.LOAD_OFFICE_PROFILE, payload: { ...payload, noLoad: true } });

        yield put({ type: actionTypes.UPDATE_OFFICE_PROFILE_FINISHED });
    } catch (error) {
        sentry.captureException(error);

        const payload = action.payload;

        notification['error']({
            message: 'Unable to update office profile info.',
            // description: error.message
        });

        yield put({ type: actionTypes.LOAD_OFFICE_PROFILE, payload: { ...payload, noLoad: true } });

        yield put({ type: actionTypes.UPDATE_OFFICE_PROFILE_FINISHED });
    }
}


function checkValidEmail(payload, firebase) {
    const apiCall = firebase.functions.httpsCallable('checkValidEmail');
    return apiCall({ ...payload })
        .then(response => {
            const data = response.data;
            const valid = data.valid || false;
            return valid;
        })
}

function* checkValidEmailWorkerSaga(action) {
    try {
        const payload = action.payload;
        let firebase = yield select(selectors.firebase);
        const response = yield call(checkValidEmail, payload, firebase);

        yield put({ type: actionTypes.CHECK_VALID_EMAIL_FINISHED, payload: { validEmail: response } });
    } catch (error) {
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to check if email is valid.',
            // description: error.message
        });

        yield put({ type: actionTypes.CHECK_VALID_EMAIL_FINISHED, payload: { validEmail: false } });
    }
}

function submitSupportTicket(payload, firebase) {
    const apiCall = firebase.functions.httpsCallable('submitSupportTicket');
    return apiCall({ ...payload, onFinish: null });
}

function* submitSupportTicketWorkerSaga(action) {
    try {
        const payload = action.payload;
        let firebase = yield select(selectors.firebase);
        yield call(submitSupportTicket, payload, firebase);

        notification['success']({
            message: 'Sent your ticket to your Experience Manager...',
            // description: error.message
        });

        const finish = payload.onFinish;
        finish();

        yield put({ type: actionTypes.SUBMIT_SERVICE_TICKET_FINISHED });
    } catch (error) {
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to submit ticket.',
            // description: error.message
        });

        const payload = action.payload;
        const finish = payload.onFinish;
        finish();

        yield put({ type: actionTypes.SUBMIT_SERVICE_TICKET_FINISHED });
    }
}

function addRequestForService(payload, firebase) {
    const apiCall = firebase.functions.httpsCallable('addRequestFromPortal');
    return apiCall({ ...payload, onFinish: null });
}

function* addRequestForServiceWorkerSaga(action) {
    try {
        const payload = action.payload;
        let firebase = yield select(selectors.firebase);
        yield call(addRequestForService, payload, firebase);

        notification['success']({
            message: 'Sent your request to your Experience Manager...',
            // description: error.message
        });

        const finish = payload.onFinish;
        finish();

        yield put({ type: actionTypes.ADD_REQUEST_SERVICE_FINISHED });
    } catch (error) {
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to request service.',
            // description: error.message
        });

        const payload = action.payload;
        const finish = payload.onFinish;
        finish();

        yield put({ type: actionTypes.ADD_REQUEST_SERVICE_FINISHED });
    }
}

function acceptServiceOption(payload, firebase) {
    const apiCall = firebase.functions.httpsCallable('acceptServicePlanOption');
    return apiCall({ ...payload });
}

function* acceptServiceOptionWorkerSaga(action) {
    try {
        const payload = action.payload;
        let firebase = yield select(selectors.firebase);
        yield call(acceptServiceOption, payload, firebase);

        yield put({ type: actionTypes.GET_SERVICE_PLAN_FOR_OFFICE_NO_LOAD, payload: payload });
        yield put({ type: actionTypes.ACCEPT_SERVICE_OPTION_FINISHED, payload: {} });
    } catch (error) {
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to accept service option.',
            // description: error.message
        });

        yield put({ type: actionTypes.ACCEPT_SERVICE_OPTION_FINISHED });
    }
}

function pendingServiceOption(payload, firebase) {
    const apiCall = firebase.functions.httpsCallable('pendingServicePlanOption');
    return apiCall({ ...payload });
}

function* pendingServiceOptionWorkerSaga(action) {
    try {
        const payload = action.payload;
        let firebase = yield select(selectors.firebase);
        yield call(pendingServiceOption, payload, firebase);

        yield put({ type: actionTypes.GET_SERVICE_PLAN_FOR_OFFICE_NO_LOAD, payload: payload });

        yield put({ type: actionTypes.PENDING_SERVICE_OPTION_FINISHED });
    } catch (error) {
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to unselect service option.',
            // description: error.message
        });

        yield put({ type: actionTypes.PENDING_SERVICE_OPTION_FINISHED });
    }
}

function confirmPendingPackage(payload, firebase) {
    const apiCall = firebase.functions.httpsCallable('confirmPendingPackage');
    return apiCall({ ...payload });
}

function* confirmPendingPackageWorkerSaga(action) {
    try {
        const payload = action.payload;
        let firebase = yield select(selectors.firebase);
        yield call(confirmPendingPackage, payload, firebase);

        yield put({ type: actionTypes.GET_SERVICE_PLAN_FOR_OFFICE_NO_LOAD, payload: payload });
        yield put({ type: actionTypes.CONFIRM_PENDING_PACKAGE_FINISHED, payload: {} });
    } catch (error) {
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to add package to your service plan.',
            // description: error.message
        });

        yield put({ type: actionTypes.CONFIRM_PENDING_PACKAGE_FINISHED, payload: {} });
    }
}

function rejectPendingPackage(payload, firebase) {
    const apiCall = firebase.functions.httpsCallable('rejectPendingPackage');
    return apiCall({ ...payload });
}

function* rejectPendingPackageWorkerSaga(action) {
    try {
        const payload = action.payload;
        let firebase = yield select(selectors.firebase);
        yield call(rejectPendingPackage, payload, firebase);

        yield put({ type: actionTypes.GET_SERVICE_PLAN_FOR_OFFICE_NO_LOAD, payload: payload });
        yield put({ type: actionTypes.REJECT_PENDING_PACKAGE_FINISHED, payload: {} });
    } catch (error) {
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to reject package.',
            // description: error.message
        });

        yield put({ type: actionTypes.REJECT_PENDING_PACKAGE_FINISHED, payload: {} });
    }
}

function sendPasswordReset(payload, firebase) {
    const email = payload.email || null;
    if (email === null) {
        throw Error("No email provided.");
    }
    return firebase.auth.sendPasswordResetEmail(email);
}

function* sendPasswordResetWorkerSaga(action) {
    try {
        const payload = action.payload;
        const email = payload.email || null;
        let firebase = yield select(selectors.firebase);
        yield call(sendPasswordReset, payload, firebase);


        notification['success']({
            message: 'Please check your email for further instructions to reset your password.',
            // description: error.message
        });

        yield put({ type: actionTypes.SEND_PASSWORD_RESET_FINISHED });
    } catch (error) {
        sentry.captureException(error);

        notification['error']({
            message: 'Unable to send password reset email.',
            // description: error.message
        });

        yield put({ type: actionTypes.SEND_PASSWORD_RESET_FINISHED });
    }
}

// function acceptServiceAddOn(payload, firebase) {
//     const apiCall = firebase.functions.httpsCallable('acceptServicePlanAddOn');
//     return apiCall({ ...payload });
// }

// function* acceptServiceAddOnWorkerSaga(action) {
//     try {
//         const payload = action.payload;
//         let firebase = yield select(selectors.firebase);
//         yield call(acceptServiceAddOn, payload, firebase);

//         yield put({ type: actionTypes.GET_SERVICE_PLAN_FOR_OFFICE_NO_LOAD, payload: payload });

//         yield put({ type: actionTypes.ACCEPT_SERVICE_ADDON_FINISHED });
//     } catch (error) {
//         sentry.captureException(error);

//         notification['error']({
//             message: 'Unable to select service add-on.',
//             description: error.message
//         });

//         yield put({ type: actionTypes.ACCEPT_SERVICE_ADDON_FINISHED });
//     }
// }

// function pendingServiceAddOn(payload, firebase) {
//     const apiCall = firebase.functions.httpsCallable('pendingServicePlanAddOn');
//     return apiCall({ ...payload });
// }

// function* pendingServiceAddOnWorkerSaga(action) {
//     try {
//         const payload = action.payload;
//         let firebase = yield select(selectors.firebase);
//         yield call(pendingServiceAddOn, payload, firebase);

//         yield put({ type: actionTypes.GET_SERVICE_PLAN_FOR_OFFICE_NO_LOAD, payload: payload });

//         yield put({ type: actionTypes.PENDING_SERVICE_ADDON_FINISHED });
//     } catch (error) {
//         sentry.captureException(error);

//         notification['error']({
//             message: 'Unable to unselect service add-on.',
//             description: error.message
//         });

//         yield put({ type: actionTypes.PENDING_SERVICE_ADDON_FINISHED });
//     }
// }