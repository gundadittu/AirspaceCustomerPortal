import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import * as pageTitles from '../../pages/pageTitles';

const initialState = {
    userList: [],
    roomsList: [],
    isLoadingUserData: false,
    isLoadingRoomsData: false,
    createUserFormLoading: false,
    editUserFormLoading: false,
    removeUserFormLoading: false
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.EDIT_OFFICE_USER:
            return updateObject(state, {editUserFormLoading: true});
        case actionTypes.EDIT_OFFICE_USER_FINISHED:
            const editPayload = action.payload;
            editPayload.hideForm();
            return updateObject(state, {editUserFormLoading: false});
        case actionTypes.REMOVE_OFFICE_USER:
            return updateObject(state, {removeUserFormLoading: true});
        case actionTypes.REMOVE_OFFICE_USER_FINISHED:
            const removePayload = action.payload;
            const componentRef = removePayload.componentRef;
            componentRef.setState({removeUserFormVisible: false})
            return updateObject(state, {removeUserFormLoading: false});
        case actionTypes.CREATE_USER_FOR_OFFICEADMIN:
            return updateObject(state, {createUserFormLoading: true});
        case actionTypes.CREATE_USER_FOR_OFFICEADMIN_FINISHED:
            const createPayload = action.payload;
            createPayload.hideFormRef();
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

        case actionTypes.LOAD_CONFERENCE_ROOMS:
            return updateObject(state, {isLoadingRoomsData: true});
        case actionTypes.LOAD_CONFERENCE_ROOMS_SUCCESS:
            // properly update state here
            const roomsList = action.payload.roomsList || null;
            return updateObject(state, {roomsList: roomsList, isLoadingRoomsData: false});
        case actionTypes.LOAD_CONFERENCE_ROOMS_ERROR:
            return updateObject(state, {isLoadingRoomsData: false});
    }
    return state;
};

export default reducer;
