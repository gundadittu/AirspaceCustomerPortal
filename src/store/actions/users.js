import * as actionTypes from './actionTypes';

export const loadOfficeUsers = (officeUID) => { 
    return {
        type: actionTypes.LOAD_OFFICE_USERS, 
        payload: { 
            officeUID: officeUID
        }
    };
}