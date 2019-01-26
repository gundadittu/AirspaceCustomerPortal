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
        case pageTitles.homePageRegularUser:
            return regularUserHomePagePayload()
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

const officeAdminConferenceRoomsPagePayload = () => {
  return {
    currentPage: pageTitles.conferenceRoomsPageOfficeAdmin,
  }
}
