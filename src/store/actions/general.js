import * as actionTypes from './actionTypes';

export const setUpFirebaseInstanceAction = (firebaseInstance) => { 
    return {
        type: actionTypes.SET_UP_FIREBASE, 
        payload: { 
            firebase: firebaseInstance
        }
    };
}

export const changePage = (payload) => { 
    return {
        type: actionTypes.CHANGE_PAGE, 
        payload: { ...payload }
    };
}