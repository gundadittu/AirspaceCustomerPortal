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
    notifications: [],
    checkIn: false,
    checking_user_in: false
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.START_HOME:
            if (!state.currentPage){
              return updateObject(state, {currentPage:'homePageOfficeAdmin'})
            }
        case actionTypes.SIGN_IN_USER:
            return updateObject(state, {isLoadingSignIn: true});
        case actionTypes.SIGN_IN_USER_SUCCESS:
              console.log("Sign in User  Success")
             return updateObject(state, {isLoadingSignIn: false, error: null, currentPage: "homePageOfficeAdmin"});
        case actionTypes.SIGN_IN_USER_ERROR:
             const signInError = action.payload.error || null;
            return updateObject(state, {isLoadingSignIn: false, error: signInError});
        case actionTypes.SET_UP_USER:
            console.log("Set up User")
            return updateObject(state, {isLoading: true});
        case actionTypes.SET_UP_USER_SUCCESS:
            return updateObject(state, {isLoading: false, error: null});
        case actionTypes.SET_UP_USER_ERROR:
            const setUpError = action.payload.error || null;
            return updateObject(state, {isLoading: false, error: setUpError});
        case actionTypes.SIGN_OUT_USER:
            return updateObject(state, {isLoading: true, error: null, currentPage: null});
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
            const newPage = payload.currentPage
            console.log("Change Page", payload)
            return updateObject(state, {...payload})
        case actionTypes.LOAD_NOTIFICATIONS_SUCCESS:
        case actionTypes.LOAD_NOTIFICATIONS_ERROR:
            const notPayload = action.payload || null;
            return updateObject(state, {...notPayload})
        case actionTypes.GUEST_SELF_CHECK_IN_STATUS:
            return updateObject(state, {checkedIn: false, checking_user_in: true})
        case actionTypes.GUEST_SELF_CHECK_IN_STATUS_SUCCESS:
            return updateObject(state, {checkedIn: true, checking_user_in: false})
        case actionTypes.GUEST_SELF_CHECK_IN_STATUS_ERROR:
            return updateObject(state, {checkedIn: true, checking_user_in: false})
        default:
            return state;
    }
    // return state;
};

export default reducer;
