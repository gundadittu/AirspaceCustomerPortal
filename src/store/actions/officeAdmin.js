import * as actionTypes from './actionTypes';

export const loadOfficeUsers = (officeUID) => { 
    return {
        type: actionTypes.LOAD_OFFICE_USERS, 
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