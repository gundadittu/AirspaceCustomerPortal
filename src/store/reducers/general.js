import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    isLoading: false,
    error: null,
    currentPage: null, 
    regularUserPortalMode: 'regular',
    currentOfficeAdminUID: null, 
    currentOfficeAdmin: null,
    isLoadingSignIn: false, 
    notifications: []
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SIGN_IN_USER:
            return updateObject(state, {isLoadingSignIn: true});
        case actionTypes.SIGN_IN_USER_SUCCESS:
             return updateObject(state, {isLoadingSignIn: false, error: null});
        case actionTypes.SIGN_IN_USER_ERROR:
             const signInError = action.payload.error || null;
            return updateObject(state, {isLoadingSignIn: false, error: signInError});
        case actionTypes.SET_UP_USER:
            return updateObject(state, {isLoading: true});
        case actionTypes.SET_UP_USER_SUCCESS:
            return updateObject(state, {isLoading: false, error: null});
        case actionTypes.SET_UP_USER_ERROR:
            const setUpError = action.payload.error || null;
            return updateObject(state, {isLoading: false, error: setUpError});
        case actionTypes.SIGN_OUT_USER:
            return updateObject(state, {isLoading: true, error: null});
         case actionTypes.SIGN_OUT_USER_SUCCESS:
        case actionTypes.SIGN_OUT_USER_ERROR:
            return updateObject(state, {isLoading: false, error: null});
        case actionTypes.LOAD_OFFICE_USERS:
            return updateObject(state, {isLoading: true});
        case actionTypes.LOAD_OFFICE_USERS_SUCCESS:
            return updateObject(state, {isLoading: false, error: null});
        case actionTypes.LOAD_OFFICE_USERS_ERROR:
            const loadError = action.payload.error || null;
            return updateObject(state, {isLoading: false, error: loadError});
        case actionTypes.CHANGE_PAGE:
            const payload = action.payload || null;
            return updateObject(state, {...payload})
        case actionTypes.LOAD_NOTIFICATIONS_SUCCESS: 
        case actionTypes.LOAD_NOTIFICATIONS_ERROR: 
            const notPayload = action.payload || null;
            return updateObject(state, {...notPayload})
        default:
            return state;
    }
    // return state;
};

export default reducer;
