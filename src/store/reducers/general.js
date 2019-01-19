import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    isLoading: false,
    error: null,
    firebase: null
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_UP_FIREBASE:
            console.log('reducers/general.js - SET_UP_FIREBASE');
            let firebase = action.payload.firebase;
            return updateObject(state, {firebase: firebase});
        case actionTypes.SIGN_IN_USER:
            return updateObject(state, {isLoading: true});
        case actionTypes.SIGN_IN_USER_SUCCESS:
             return updateObject(state, {isLoading: false, error: null});
        case actionTypes.SIGN_IN_USER_ERROR:
             const signInError = action.payload.error || null;
            return updateObject(state, {isLoading: false, error: signInError});
        case actionTypes.SET_UP_USER:
            return updateObject(state, {isLoading: true});
        case actionTypes.SET_UP_USER_SUCCESS:
            return updateObject(state, {isLoading: false, error: null});
        case actionTypes.SIGN_OUT_USER_SUCCESS:
            return updateObject(state, {isLoading: false, error: null});
        case actionTypes.SET_UP_USER_ERROR:
            const userError = action.payload.error || null;
            return updateObject(state, {isLoading: false, error: userError});
        case actionTypes.LOAD_OFFICE_USERS:
            return updateObject(state, {isLoading: true});
        case actionTypes.LOAD_OFFICE_USERS_SUCCESS:
            return updateObject(state, {isLoading: false, error: null});
        case actionTypes.LOAD_OFFICE_USERS_ERROR:
            const loadError = action.payload.error || null;
            return updateObject(state, {isLoading: false, error: loadError});
        default:
            return state;
    }
    // return state;
};

export default reducer;
