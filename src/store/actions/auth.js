import * as actionTypes from './actionTypes';

export const setUpUserAction = (uid) => { 
    return {
        type: actionTypes.SET_UP_USER, 
        payload: {
            uid: uid
        }
    };
}