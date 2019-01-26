import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import * as pageTitles from '../../pages/pageTitles';

const initialState = {
    userList: [], 
    isLoadingUserData: false, 
    createUserFormLoading: false, 
    editUserFormLoading: false 
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.CREATE_USER_FOR_OFFICEADMIN: 
            return updateObject(state, {createUserFormLoading: true});
        case actionTypes.CREATE_USER_FOR_OFFICEADMIN_FINISHED: 
            const createPayload = action.payload;
            createPayload.componentRef.setState({createUserFormVisible: false});
            createPayload.formRef.resetFields();
            return updateObject(state, {createUserFormLoading: false});
        case actionTypes.CHANGE_PAGE:
            const payload = action.payload || null;
            const pageName = payload.currentpage || null;
            if (pageName == pageTitles.homePageOfficeAdmin) { 
                return initialState;
            } else { 
                return state;
            }
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