import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import * as pageTitles from '../../pages/pageTitles';

const initialState = {
    userList: [],
    announcementsList: [],
    activeRoomsList: [],
    inactiveRoomsList: [],
    guestsList: [],
    serviceRequestsList: [],
    serviceRequestsEmailsList: [],
    activeDesksList: [],
    inactiveDesksList: [],
    upcomingEventsList: [],
    pastEventsList: [],
    checkedIn: false,
    isLoadingAnnouncementsData: false,
    isLoadingUserData: false,
    isLoadingRoomsData: false,
    isLoadingGuestsData: false,
    isLoadingHotDesksData: false,
    isLoadingServiceRequestsData: false,
    isLoadingServiceRequestsEmailsData: false,
    successfulServiceRequestUpdate: false,
    isEditingGuestsData: false,
    updatingServiceStatus: false,
    isLoadingEventsData: false,
    createUserFormLoading: false,
    editUserFormLoading: false,
    removeUserFormLoading: false,
    addRoomFormLoading: false,
    editRoomFormLoading: false,
    addEventFormLoading: false,
    editEventFormLoading: false,
    createDeskFormLoading: false,
    editDeskFormLoading: false,
    isLoadingSpaceInfo: false,
    onboardingURL: null,
    floorplanURL: null,
    buildingDetailsURL: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EDIT_CONF_ROOM:
            return updateObject(state, { editRoomFormLoading: true });
        case actionTypes.EDIT_CONF_ROOM_FINISHED:
            const editRoomPayload = action.payload;
            editRoomPayload.hideForm();
            return updateObject(state, { editRoomFormLoading: false });
        case actionTypes.ADD_CONF_ROOM:
            return updateObject(state, { addRoomFormLoading: true });
        case actionTypes.ADD_CONF_ROOM_FINISHED:
            const addPayload = action.payload;
            addPayload.hideForm();
            return updateObject(state, { addRoomFormLoading: false });
        case actionTypes.EDIT_OFFICE_USER:
            return updateObject(state, { editUserFormLoading: true });
        case actionTypes.EDIT_OFFICE_USER_FINISHED:
            const editPayload = action.payload;
            editPayload.hideForm();
            return updateObject(state, { editUserFormLoading: false });
        case actionTypes.REMOVE_OFFICE_USER:
            return updateObject(state, { removeUserFormLoading: true });
        case actionTypes.REMOVE_OFFICE_USER_FINISHED:
            const removePayload = action.payload;
            const componentRef = removePayload.componentRef;
            componentRef.setState({ removeUserFormVisible: false })
            return updateObject(state, { removeUserFormLoading: false });
        case actionTypes.CREATE_USER_FOR_OFFICEADMIN:
            return updateObject(state, { createUserFormLoading: true });
        case actionTypes.CREATE_USER_FOR_OFFICEADMIN_FINISHED:
            const createPayload = action.payload;
            createPayload.hideFormRef();
            return updateObject(state, { createUserFormLoading: false });
        case actionTypes.CHANGE_PAGE:
            const payload = action.payload || null;
            const pageName = payload.currentpage || null;
            if (pageName === pageTitles.homePageOfficeAdmin) {
                return initialState;
            } else {
                return state;
            }
        case actionTypes.LOAD_OFFICE_USERS:
            return updateObject(state, { isLoadingUserData: true });
        case actionTypes.LOAD_OFFICE_USERS_SUCCESS:
            const userList = action.payload.userList || null;
            return updateObject(state, { userList: userList, isLoadingUserData: false });
        case actionTypes.LOAD_OFFICE_USERS_ERROR:
            return updateObject(state, { isLoadingUserData: false });
        //
        case actionTypes.LOAD_ADMIN_ANNOUNCEMENTS:
            return updateObject(state, { isLoadingAnnouncementsData: true });
        case actionTypes.LOAD_ADMIN_ANNOUNCEMENTS_SUCCESS:
            const announcements = action.payload.announcements || null;
            return updateObject(state, { announcementsList: announcements, isLoadingAnnouncementsData: false });
        case actionTypes.LOAD_ADMIN_ANNOUNCEMENTS_ERROR:
            return updateObject(state, { isLoadingAnnouncementsData: false });

        case actionTypes.POST_ADMIN_ANNOUNCEMENT:
            return updateObject(state, {});
        case actionTypes.POST_ADMIN_ANNOUNCEMENT_SUCCESS:
            return updateObject(state, {});
        case actionTypes.POST_ADMIN_ANNOUNCEMENT_ERROR:
            return updateObject(state, {});
        //
        case actionTypes.LOAD_CONFERENCE_ROOMS:
            return updateObject(state, { isLoadingRoomsData: true });
        case actionTypes.LOAD_CONFERENCE_ROOMS_SUCCESS:
            const activeRoomsList = action.payload.activeRoomsList || null;
            const inactiveRoomsList = action.payload.inactiveRoomsList || null;
            return updateObject(state, { activeRoomsList: activeRoomsList, inactiveRoomsList: inactiveRoomsList, isLoadingRoomsData: false });
        case actionTypes.LOAD_CONFERENCE_ROOMS_ERROR:
            return updateObject(state, { isLoadingRoomsData: false });
        case actionTypes.LOAD_HOT_DESKS:
            return updateObject(state, { isLoadingHotDesksData: true });
        case actionTypes.LOAD_HOT_DESKS_SUCCESS:
            const activeDesks = action.payload.activeDesksList || null;
            const inactiveDesks = action.payload.inactiveDesksList || null;
            return updateObject(state, { activeDesksList: activeDesks, inactiveDesksList: inactiveDesks, isLoadingHotDesksData: false });
        case actionTypes.LOAD_HOT_DESKS_ERROR:
            return updateObject(state, {isLoadingHotDesksData: false});
        case actionTypes.LOAD_SERVICE_REQUESTS:
            return updateObject(state, {isLoadingServiceRequestsData: true});
        case actionTypes.LOAD_SERVICE_REQUESTS_SUCCESS:
            const serviceRequestsList = action.payload.serviceRequestsList || null;
            return updateObject(state, { serviceRequestsList: serviceRequestsList, isLoadingServiceRequestsData: false});
        case actionTypes.LOAD_SERVICE_REQUESTS_ERROR:
            return updateObject(state, {isLoadingServiceRequestsData: false});
            //
        case actionTypes.LOAD_SERVICE_REQUESTS_EMAILS:
            return updateObject(state, {isLoadingServiceRequestsEmailsData: true});
        case actionTypes.LOAD_SERVICE_REQUESTS_EMAILS_SUCCESS:
            const serviceRequestsEmailsList = action.payload.serviceEmailsList || null;
            return updateObject(state, { serviceRequestsEmailsList: serviceRequestsEmailsList, isLoadingServiceRequestsEmailsData: false});
        case actionTypes.LOAD_SERVICE_REQUESTS_EMAILS_ERROR:
            return updateObject(state, {isLoadingServiceRequestsEmailsData: false});
            //
            //
        case actionTypes.EDIT_SERVICE_REQUESTS_EMAILS:
            return updateObject(state, {finishedUpdatingEmails: false, isLoadingServiceRequestsEmailsData: true});
        case actionTypes.EDIT_SERVICE_REQUESTS_EMAILS_SUCCESS:
            const editEmailsPayload = action.payload;
            editEmailsPayload.hideForm();
            return updateObject(state, { finishedUpdatingEmails: true, isLoadingServiceRequestsEmailsData: false });
        case actionTypes.EDIT_SERVICE_REQUESTS_EMAILS_ERROR:
            return updateObject(state, {finishedUpdatingEmails: true, isLoadingServiceRequestsEmailsData: false});
            //
        case actionTypes.EDIT_SERVICE_REQUESTS_STATUS:
            return updateObject(state, {updatingServiceStatus: true, successfulServiceRequestUpdate: false});
        case actionTypes.EDIT_SERVICE_REQUESTS_STATUS_SUCCESS:
            return updateObject(state, {updatingServiceStatus: false, successfulServiceRequestUpdate: true });
        case actionTypes.EDIT_SERVICE_REQUESTS_STATUS_ERROR:
            return updateObject(state, {updatingServiceStatus: false});

        case actionTypes.LOAD_REGISTERED_GUESTS:
            return updateObject(state, {isLoadingGuestsData: true});
        case actionTypes.LOAD_REGISTERED_GUESTS_SUCCESS:
            const guestList = action.payload.guestList || null;
            return updateObject(state, { guestsList: guestList, isLoadingGuestsData: false});
        case actionTypes.LOAD_REGISTERED_GUESTS_ERROR:
            return updateObject(state, {isLoadingGuestsData: false});
            //
        case actionTypes.EDIT_REGISTERED_GUESTS_STATUS:
            return updateObject(state, {isEditingGuestsData: true, checkedIn: false});
        case actionTypes.EDIT_REGISTERED_GUESTS_STATUS_SUCCESS:
            return updateObject(state, { isEditingGuestsData: false, checkedIn: true});
        case actionTypes.EDIT_REGISTERED_GUESTS_STATUS_ERROR:
            return updateObject(state, {isEditingGuestsData: false, checkedIn: false});
            //
        case actionTypes.LOAD_EVENTS:
            return updateObject(state, {isLoadingEventsData: true});
        case actionTypes.LOAD_EVENTS_SUCCESS:
            const pastEventsList = action.payload.pastEventsList || null;
            const upcomingEventsList = action.payload.upcomingEventsList || null;
            return updateObject(state, {pastEventsList: pastEventsList, upcomingEventsList: upcomingEventsList, isLoadingEventsData: false});
        case actionTypes.LOAD_EVENTS_ERROR:
            return updateObject(state, {isLoadingEventsData: false});
        case actionTypes.ADD_HOT_DESK:
            return updateObject(state, { createDeskFormLoading: true });
        case actionTypes.ADD_HOT_DESK_FINISHED:
             const addDeskPayload = action.payload;
             addDeskPayload.hideForm();
            return updateObject(state, { createDeskFormLoading: false });
        case actionTypes.EDIT_HOT_DESK:
            return updateObject(state, { editDeskFormLoading: true });
        case actionTypes.EDIT_HOT_DESK_FINISHED:
             const editDeskPayload = action.payload;
             editDeskPayload.hideForm();
            return updateObject(state, { editDeskFormLoading: false });
        case actionTypes.LOAD_SPACE_INFO:
            return updateObject(state, { isLoadingSpaceInfo: true });
        case actionTypes.LOAD_SPACE_INFO_FINISHED:
            const spacePayload = action.payload;
            const onboardingURL = spacePayload.onboardingURL;
            const floorplanURL = spacePayload.floorplanURL;
            const buildingDetailsURL = spacePayload.buildingDetailsURL;
            return updateObject(state, { isLoadingSpaceInfo: false, onboardingURL: onboardingURL, floorplanURL: floorplanURL, buildingDetailsURL: buildingDetailsURL });
        case actionTypes.LOAD_SPACE_INFO_FINISHED_ERROR:
            return updateObject(state, { isLoadingSpaceInfo: false });
        case actionTypes.CREATE_EVENT:
            return updateObject(state, { addEventFormLoading: true });
        case actionTypes.CREATE_EVENT_FINISHED:
            const createEventPayload = action.payload;
            createEventPayload.hideForm();
            return updateObject(state, { addEventFormLoading: false });
        case actionTypes.EDIT_EVENT:
            return updateObject(state, { editEventFormLoading: true });
        case actionTypes.EDIT_EVENT_FINISHED:
            const editEventPayload = action.payload;
            editEventPayload.hideForm();
            return updateObject(state, { editEventFormLoading: false });
        default:
            return state
    }
};

export default reducer;
