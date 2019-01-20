import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    currentOfficeAdminUID: 'qGTShTzLuOI3uDXXNM6J',
    userList: [], 
    isLoadingUserData: false
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.LOAD_OFFICE_USERS:
            return updateObject(state, {isLoadingUserData: true});
        case actionTypes.LOAD_OFFICE_USERS_SUCCESS:
            // properly update state here 
            const userList = action.payload.userList || null;
            return updateObject(state, {userList: userList, isLoadingUserData: false});
        case actionTypes.LOAD_OFFICE_USERS_ERROR: 
            return updateObject(state, {isLoadingUserData: false});
    }
    return state;
};

export default reducer;