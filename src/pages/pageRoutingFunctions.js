import * as pageTitles from './pageTitles';

const getPagePayload = (pageName, payload) => {
    switch (pageName) {
        case pageTitles.homePageOfficeAdmin:
            const officeUID = payload.officeUID || null;
            const officeObj = payload.officeObj || null;
            return officeAdminHomePagePayload(officeUID, officeObj)
        case pageTitles.userPageOfficeAdmin:
            return officeAdminUsersPagePayload()
        case pageTitles.conferenceRoomsPageOfficeAdmin:
            return officeAdminConferenceRoomsPagePayload()
        case pageTitles.hotDesksPageOfficeAdmin:
            return officeAdminHotDesksPagePayload()
        case pageTitles.registeredGuestsPageOfficeAdmin:
            return officeAdminRegGuestsPagePayload()
        case pageTitles.serviceRequestsPageOfficeAdmin:
            return officeAdminServiceRequestsPagePayload()
        case pageTitles.eventsPageOfficeAdmin:
            return officeAdminEventsPagePayload()
        case pageTitles.homePageRegularUser:
            return regularUserHomePagePayload()
        case pageTitles.spaceInfoPageOfficeAdmin:
            return officeAdminSpaceInfoPagePayload()
        default:
            return {}
    }
}
export default getPagePayload;

const regularUserHomePagePayload = () => {
    return {
        currentPage: pageTitles.homePageRegularUser,
        currentOfficeAdminUID: null,
        regularUserPortalMode: 'regular'
    }
}

const officeAdminHomePagePayload = (officeUID, officeObj) => {
    return {
        currentPage: pageTitles.homePageOfficeAdmin,
        currentOfficeAdminUID: officeUID,
        currentOfficeAdmin: officeObj,
        regularUserPortalMode: 'officeAdmin'
    }
}

 const officeAdminUsersPagePayload = () => {
    return {
        currentPage: pageTitles.userPageOfficeAdmin,
    }
}

const officeAdminSpaceInfoPagePayload = () => {
    return {
        currentPage: pageTitles.spaceInfoPageOfficeAdmin,
    }
}

const officeAdminConferenceRoomsPagePayload = () => {
  return {
    currentPage: pageTitles.conferenceRoomsPageOfficeAdmin,
  }
}

const officeAdminHotDesksPagePayload = () => {
    return {
      currentPage: pageTitles.hotDesksPageOfficeAdmin,
    }
  }

  const officeAdminServiceRequestsPagePayload = () => {
      return {
        currentPage: pageTitles.serviceRequestsPageOfficeAdmin,
      }
    }

  const officeAdminEventsPagePayload = () => {
    return {
      currentPage: pageTitles.eventsPageOfficeAdmin,
    }
  }

  const officeAdminRegGuestsPagePayload = () => {
    return {
      currentPage: pageTitles.registeredGuestsPageOfficeAdmin,
    }
  }
