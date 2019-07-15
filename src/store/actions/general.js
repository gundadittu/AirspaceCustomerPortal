import * as actionTypes from './actionTypes';

export const getOfficeReport = (payload) => {
  return {
    type: actionTypes.LOAD_OFFICE_REPORT,
    payload: {
      ...payload
    }
  }
}

export const getBuildingOfficeReport = (payload) => {
  return {
    type: actionTypes.LOAD_BUILDING_OFFICE_REPORT,
    payload: {
      ...payload
    }
  }
}

export const sendPasswordReset = (email) => {
  return {
    type: actionTypes.SEND_PASSWORD_RESET,
    payload: {
      email: email
    }
  }
}

export const acceptServiceOption = (payload) => {
  return {
    type: actionTypes.ACCEPT_SERVICE_OPTION,
    payload: {
      selectedOfficeUID: payload.selectedOfficeUID,
      recordID: payload.recordID
    }
  }
}

export const pendingServiceOption = (payload) => {
  return {
    type: actionTypes.PENDING_SERVICE_OPTION,
    payload: {
      selectedOfficeUID: payload.selectedOfficeUID,
      recordID: payload.recordID
    }
  }
}

export const confirmPendingPackage = (payload) => {
  return {
    type: actionTypes.CONFIRM_PENDING_PACKAGE,
    payload: {
      selectedOfficeUID: payload.selectedOfficeUID,
      recordID: payload.recordID
    }
  }
}

export const rejectPendingPackage = (payload) => {
  return {
    type: actionTypes.REJECT_PENDING_PACKAGE,
    payload: {
      selectedOfficeUID: payload.selectedOfficeUID,
      recordID: payload.recordID
    }
  }
}


// export const acceptServiceAddOn = (payload) => {
//   return {
//     type: actionTypes.ACCEPT_SERVICE_ADDON,
//     payload: {
//       selectedOfficeUID: payload.selectedOfficeUID,
//       recordID: payload.recordID
//     }
//   }
// }

// export const pendingServiceAddOn = (payload) => {
//   return {
//     type: actionTypes.PENDING_SERVICE_ADDON,
//     payload: {
//       selectedOfficeUID: payload.selectedOfficeUID,
//       recordID: payload.recordID
//     }
//   }
// }

export const storeAlexaRedirect = (payload) => {
  return {
    type: actionTypes.STORE_ALEXA_REDIRECT,
    payload: {
      redirect: payload.redirect
    }
  }
}

export const checkValidEmail = (payload) => {
  return {
    type: actionTypes.CHECK_VALID_EMAIL,
    payload: {
      email: payload.email
    }
  }
}

export const submitSupportTicket = (payload) => {
  return {
    type: actionTypes.SUBMIT_SERVICE_TICKET,
    payload: {
      selectedOfficeUID: payload.selectedOfficeUID,
      details: payload.details,
      onFinish: payload.onFinish
    }
  }
}
export const addRequestForService = (payload) => {
  return {
    type: actionTypes.ADD_REQUEST_SERVICE,
    payload: {
      serviceType: payload.serviceType,
      serviceDescription: (payload.serviceDescription || null),
      selectedOfficeUID: payload.selectedOfficeUID,
      onlyInterested: payload.onlyInterested,
      onFinish: payload.onFinish
      // details: (payload.details || null)
    }
  }
}

export const loadOfficeProfile = (payload) => {
  return {
    type: actionTypes.LOAD_OFFICE_PROFILE,
    payload: {
      selectedOfficeUID: payload.selectedOfficeUID
    }
  }
}

export const updateOfficeProfile = (payload) => {
  return {
    type: actionTypes.UPDATE_OFFICE_PROFILE,
    payload: {
      selectedOfficeUID: payload.selectedOfficeUID,
      changes: payload.changes
    }
  }
}

export const uploadAttachmentOfficeProfile = (payload) => {
  return {
    type: actionTypes.UPLOAD_ATTACHMENT_OFFICE_PROFILE,
    payload: {
      ...payload
    }
  }
}

export const getEMInfo = (payload) => {
  return {
    type: actionTypes.LOAD_EM_INFO,
    payload: {
      selectedOfficeUID: payload.selectedOfficeUID
    }
  }
}

export const getServicePlan = (payload) => {
  return {
    type: actionTypes.GET_SERVICE_PLAN_FOR_OFFICE,
    payload: {
      selectedOfficeUID: payload.selectedOfficeUID
    }
  }
}

export const getAllInvoices = (payload) => {
  return {
    type: actionTypes.GET_ALL_INVOICES_FOR_OFFICE,
    payload: {
      selectedOfficeUID: payload.selectedOfficeUID
    }
  }
}

export const submitGetStartedData = (payload) => {
  return {
    type: actionTypes.SUBMIT_GET_STARTED_DATA,
    payload: {
      ...payload
    }
  }
}

export const updateGetStartedData = (data) => {
  return {
    type: actionTypes.UPDATE_GET_STARTED_DATA,
    payload: {
      ...data
    }
  }
}

export const changeGetStartedStep = (newStep) => {
  return {
    type: actionTypes.CHANGE_GET_STARTED_STEP,
    payload: {
      newStep: newStep
    }
  }
}

export const clearReduxState = () => {
  return {
    type: actionTypes.CLEAR_REDUX_STATE,
  }
}

export const setUpFirebaseInstanceAction = (firebaseInstance) => {
  return {
    type: actionTypes.SET_UP_FIREBASE,
    payload: {
      firebase: firebaseInstance
    }
  };
}

export const changePage = (payload) => {

  const officeUID = payload.officeUID || payload.currentOfficeAdminUID || null;
  const officeObj = payload.officeObj || payload.currentOfficeAdmin || null;


  if ((officeUID !== null) && (officeObj !== null)) {
    return {
      type: actionTypes.CHANGE_PAGE,
      payload: {
        ...payload,
        currentOfficeAdminUID: officeUID,
        currentOfficeAdmin: officeObj
      }
    }
  }

  return {
    type: actionTypes.CHANGE_PAGE,
    payload: {
      ...payload
    }
  };
}

export const loadNotifications = () => {
  return {
    type: actionTypes.LOAD_NOTIFICATIONS
  }
}

export const guestSelfCheckIn = (payload) => {
  return {
    type: actionTypes.GUEST_SELF_CHECK_IN_STATUS,
    payload: {
      registeredGuestUID: payload.registeredGuestUID
    }
  }
}

export const guestCreatePassword = (payload) => {
  return {
    type: actionTypes.GUEST_CREATE_PASSWORD,
    payload: {
      userUID: payload.userUID
    }
  }
}

export const editServiceRequestStatusForEmail = (payload) => {
  return {
    type: actionTypes.EDIT_SERVICE_REQUESTS_STATUS_EMAIL,
    payload: {
      selectedServiceRequestUID: payload.selectedServiceRequestUID,
      newStatus: payload.newStatus
    }
  }
}
