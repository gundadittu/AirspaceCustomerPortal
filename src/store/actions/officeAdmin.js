import * as actionTypes from './actionTypes';

export const loadOfficeUsers = (officeUID) => {
    return {
        type: actionTypes.LOAD_OFFICE_USERS,
        payload: {
            officeUID: officeUID
        }
    };
}

export const loadConferenceRooms = (officeUID) => {
    return {
        type: actionTypes.LOAD_CONFERENCE_ROOMS,
        payload: {
            officeUID: officeUID
        }
    };
}

export const loadHotDesks = (officeUID) => {
    return {
        type: actionTypes.LOAD_HOT_DESKS,
        payload: {
            officeUID: officeUID
        }
    };
}

export const loadRegisteredGuests = (officeUID) => {
    return {
        type: actionTypes.LOAD_REGISTERED_GUESTS,
        payload: {
            officeUID: officeUID
        }
    };
}

export const createUserForOfficeAdmin = (payload) => {
    return {
        type: actionTypes.CREATE_USER_FOR_OFFICEADMIN,
        payload: {
            ...payload
        }
    };
}

export const removeUserForOfficeAdmin = (payload) => {
    return {
        type: actionTypes.REMOVE_OFFICE_USER,
        payload: {
            ...payload,
            userUID: payload.userUID,
            officeUID: payload.officeUID
        }
    };
}

export const editUserForOfficeAdmin = (payload) => {
    return {
        type: actionTypes.EDIT_OFFICE_USER,
        payload: {
            selectedUserUID: payload.userUID,
            selectedOfficeUID: payload.officeUID,
            firstName: payload.firstName,
            lastName: payload.lastName,
            emailAddress: payload.email,
            makeUserOfficeAdmin: payload.makeUserOfficeAdmin,
            hideForm: payload.hideForm
        }
    };
}

export const editConferenceRoom = (payload) => {
    return {
        type: actionTypes.EDIT_CONF_ROOM,
        payload: {
            ...payload,
            amenities: payload.standardAmenities
            // Payload must contain the below keys
            // selectedRoomUID: uid,
            // roomName: roomName, 
            // capacity: capacity, 
            // standardAmenities: standardAmenities, 
            // customAmenities: customAmenities, 
            // selectedOfficeUID: currentOfficeUID,
            // reserveable: reserveable, 
            // activeStatus: activeStatus, 
            // photoFileObj: photoFileObj, 
            // hideFormRef: this.hideCreateRoomFormModal
        }
    }
}

export const createConferenceRoom = (payload) => {
    return {
        type: actionTypes.ADD_CONF_ROOM,
        payload: {
            ...payload,
            amenities: payload.standardAmenities
            // Payload must contain the below keys
            // roomName: roomName,
            // capacity: capacity,
            // standardAmenities: standardAmenities,
            // customAmenities: customAmenities,
            // selectedOfficeUID: currentOfficeUID,
            // reserveable: reserveable,
            // activeStatus: activeStatus,
            // photoFileObj: photoFileObj,
            // hideFormRef: this.hideCreateRoomFormModal
        }
    }
}

export const createHotDesk = (payload) => {
    return {
        type: actionTypes.ADD_HOT_DESK,
        payload: {
            ...payload
            // Payload must contain the below keys
            // deskName
            // selectedOfficeUID
            // reserveable
            // activeStatus
            // photoFileObj: photoFileObj, 
            // hideForm: this.hideCreateRoomFormModal
        }
    }
}

export const editHotDesk = (payload) => {
    return {
        type: actionTypes.EDIT_HOT_DESK,
        payload: {
            ...payload
            // NEED TO PROVIDE:
            // selectedDeskUID: this.state.selectedDesk.uid,
            // deskName: deskName,
            // reserveable: reserveable,
            // activeStatus: activeStatus,
            // photoFileObj: photoFileObj,
            // hideForm: this.hideEditDeskForm,
            // selectedOfficeUID: this.props.currentOfficeUID
        }
    }
}
