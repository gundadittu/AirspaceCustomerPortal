import * as actionTypes from './actionTypes';

export const loadOfficeUsers = (officeUID) => {
    return {
        type: actionTypes.LOAD_OFFICE_USERS,
        payload: {
            officeUID: officeUID
        }
    };
}

export const loadConferenceRooms = (officeUID) => {
    return {
        type: actionTypes.LOAD_CONFERENCE_ROOMS, 
        payload: {
            officeUID: officeUID
        }
    };
}

export const createUserForOfficeAdmin = (payload) => {
    return {
        type: actionTypes.CREATE_USER_FOR_OFFICEADMIN,
        payload: {
           ...payload
        }
    };
}

export const removeUserForOfficeAdmin = (payload) => { 
    return {
        type: actionTypes.REMOVE_OFFICE_USER, 
        payload: { 
            ...payload,
           userUID: payload.userUID, 
           officeUID: payload.officeUID
        }
    };
}

export const editUserForOfficeAdmin = (payload) => { 
    return {
        type: actionTypes.EDIT_OFFICE_USER, 
        payload: { 
            selectedUserUID: payload.userUID, 
            selectedOfficeUID: payload.officeUID, 
            firstName: payload.firstName, 
            lastName: payload.lastName, 
            emailAddress: payload.email,
            makeUserOfficeAdmin: payload.makeUserOfficeAdmin,
            hideForm: payload.hideForm
        }
    };
}
