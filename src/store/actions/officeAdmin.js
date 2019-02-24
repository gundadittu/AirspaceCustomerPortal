import * as actionTypes from './actionTypes';

export const loadOfficeUsers = (officeUID) => {
    return {
        type: actionTypes.LOAD_OFFICE_USERS,
        payload: {
            officeUID: officeUID
        }
    };
}

export const loadServiceRequests = (officeUID) => {
    return {
        type: actionTypes.LOAD_SERVICE_REQUESTS,
        payload: {
            officeUID: officeUID
        }
    };
}

export const loadServiceRequestsEmails = (officeUID) => {
    return {
        type: actionTypes.LOAD_SERVICE_REQUESTS_EMAILS,
        payload: {
            officeUID: officeUID
        }
    };
}

export const editServiceRequestEmailsForOfficeAdmin = (payload) => {
    return {
        type: actionTypes.EDIT_SERVICE_REQUESTS_EMAILS,
        payload: {
            selectedOfficeUID: payload.selectedOfficeUID,
            updatedEmails: payload.updatedEmails,
            hideForm: payload.hideForm
        }
    };
}

export const editServiceRequestStatusForOfficeAdmin = (payload) => {
    return {
        type: actionTypes.EDIT_SERVICE_REQUESTS_STATUS,
        payload: {
            selectedServiceRequestUID: payload.selectedServiceRequestUID,
            newStatus: payload.newStatus
        }
    };
}

export const editRegisteredGuestStatusForOfficeAdmin = (payload) => {
  return {
    type: actionTypes.EDIT_REGISTERED_GUESTS_STATUS,
    payload: {
      registeredGuestUID: payload.registeredGuestUID,
      newArrivalStatus: payload.newArrivalStatus
    }
  }
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

export const loadEvents = (officeUID) => {
    return {
        type: actionTypes.LOAD_EVENTS,
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

export const editEvent = (payload) => {
    return {
        type: actionTypes.EDIT_EVENT,
        payload: {
           ...payload
        // Need to provide the below:
        // selectedEventUID: selectedEventUID,
        // eventTitle: eventTitle,
        // description: description,
        // startDate: startDate,
        // endDate: endDate,
        // photoFileObj: photoFileObj,
        // canceled: canceled,
        // selectedOfficeUID: currentOfficeUID,
        // hideForm: this.handleFinishedEditEventRequest
        }
    }
}

export const createEvent = (payload) => {
    return {
        type: actionTypes.CREATE_EVENT,
        payload: {
           ...payload
        // Need to provide the below:
        //    eventTitle: eventTitle,
        //    description: description,
        //    startDate: startDate,
        //    endDate: endDate,
        //    photoFileObj: photoFileObj,
        //    selectedOfficeUID: currentOfficeUID,
        //    hideForm: this.hideCreateEventFormModal
        }
    }
}

export const getSpaceInfo = (payload) => {
    return {
        type: actionTypes.LOAD_SPACE_INFO,
        payload: {
            selectedOfficeUID: payload.officeUID
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
