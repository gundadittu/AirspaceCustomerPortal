import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import * as pageTitles from '../../pages/pageTitles';

const initialState = {
    userList: [],
    activeRoomsList: [],
    inactiveRoomsList: [],
    pastGuestsList: [],
    upcomingGuestsList: [],
    isLoadingUserData: false,
    isLoadingRoomsData: false,
    isLoadingGuestsData: false,
    isLoadingHotDesksData: false,
    createUserFormLoading: false,
    editUserFormLoading: false,
    removeUserFormLoading: false,
    addRoomFormLoading: false
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_CONF_ROOM:
            return updateObject(state, {addRoomFormLoading: true});
        case actionTypes.ADD_CONF_ROOM_FINISHED:
            const addPayload = action.payload;
            addPayload.hideForm();
            return updateObject(state, {addRoomFormLoading: false});
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
            const activeRoomsList = action.payload.activeRoomsList || null;
            const inactiveRoomsList = action.payload.inactiveRoomsList || null;
            return updateObject(state, {activeRoomsList: activeRoomsList, inactiveRoomsList: inactiveRoomsList, isLoadingRoomsData: false});
        case actionTypes.LOAD_CONFERENCE_ROOMS_ERROR:
            return updateObject(state, {isLoadingRoomsData: false});
        case actionTypes.LOAD_HOT_DESKS:
            return updateObject(state, {isLoadingHotDesksData: true});
        case actionTypes.LOAD_HOT_DESKS_SUCCESS:
            // properly update state here
            const desksList = action.payload.desksList || null;
            return updateObject(state, {desksList: desksList, isLoadingHotDesksData: false});
        case actionTypes.LOAD_HOT_DESKS_ERROR:
            return updateObject(state, {isLoadingHotDesksData: false});
        case actionTypes.LOAD_REGISTERED_GUESTS:
            return updateObject(state, {isLoadingGuestsData: true});
        case actionTypes.LOAD_REGISTERED_GUESTS_SUCCESS:
            const pastGuestsList = action.payload.pastGuestsList || null;
            const upcomingGuestsList = action.payload.upcomingGuestsList || null;
            return updateObject(state, {pastGuestsList: pastGuestsList, upcomingGuestsList: upcomingGuestsList, isLoadingGuestsData: false});
        case actionTypes.LOAD_CONFERENCE_ROOMS_ERROR:
            return updateObject(state, {isLoadingGuestsData: false});
    }
    return state;
};

export default reducer;
