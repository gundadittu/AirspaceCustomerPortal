import * as pageTitles from './pageTitles';

const getPagePayload = (pageName, payload) => {
    switch (pageName) {
        case pageTitles.homePageOfficeAdmin:
            const officeUID = payload.officeUID || null;
<<<<<<< HEAD
            return officeAdminHomePagePayload(officeUID)
        case pageTitles.userPageOfficeAdmin:
=======
            const officeObj = payload.officeObj || null;
            return officeAdminHomePagePayload(officeUID, officeObj)
        case pageTitles.userPageOfficeAdmin: 
>>>>>>> user edit + remove form fixes
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

<<<<<<< HEAD
const regularUserHomePagePayload = (officeUID) => {
    return {
        currentPage: pageTitles.homePageRegularUser,
        currentOfficeAdminUID: null,
=======
const regularUserHomePagePayload = () => { 
    return { 
        currentPage: pageTitles.homePageRegularUser, 
        currentOfficeAdminUID: null, 
>>>>>>> user edit + remove form fixes
        regularUserPortalMode: 'regular'
    }
}

<<<<<<< HEAD
const officeAdminHomePagePayload = (officeUID) => {
    return {
        currentPage: pageTitles.homePageOfficeAdmin,
        currentOfficeAdminUID: officeUID,
=======
const officeAdminHomePagePayload = (officeUID, officeObj) => { 
    return { 
        currentPage: pageTitles.homePageOfficeAdmin, 
        currentOfficeAdminUID: officeUID, 
        currentOfficeAdmin: officeObj,
>>>>>>> user edit + remove form fixes
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
