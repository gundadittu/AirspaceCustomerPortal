import * as actionTypes from './actionTypes';

export const setUpUserAction = (uid) => { 
    return {
        type: actionTypes.SET_UP_USER, 
        payload: {
            uid: uid
        }
    };
}

export const signInUserAction = (email, password) => { 
    return {
        type: actionTypes.SIGN_IN_USER, 
        payload: {
            email: email, 
            password: password
        }
    };
}