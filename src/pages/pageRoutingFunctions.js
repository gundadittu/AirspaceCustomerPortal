import * as pageTitles from './pageTitles';

const getPagePayload = (pageName, payload) => {
    switch (pageName) {
        case pageTitles.homePageOfficeAdmin:
            const officeUID = payload.officeUID || null;
            const officeObj = payload.officeObj || null;
            return officeAdminHomePagePayload(officeUID, officeObj)
        case pageTitles.userPageOfficeAdmin:
            return officeAdminUsersPagePayload()
        case pageTitles.announcementsPageOfficeAdmin:
            return officeAdminAnnouncementsPagePayload()
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
        case pageTitles.billingPageOfficeAdmin:
            return officeAdminBillingPagePayload()
        case pageTitles.servicePlanPageOfficeAdmin:
            return officeAdminServicePlanPagePayload()
        case pageTitles.findServicesPageOfficeAdmin:
            return officeAdminFindServicePagePayload()
        case pageTitles.officeProfilePageOfficeAdmin:
            return officeAdminOfficeProfilePagePayload()
        case pageTitles.supportPageOfficeAdmin:
            return officeAdminSupportPagePayload()
        default:
            return {}
    }
}
export default getPagePayload;

const officeAdminBillingPagePayload = () => {
    return {
        currentPage: pageTitles.billingPageOfficeAdmin,
    }
}

const officeAdminServicePlanPagePayload = () => {
    return {
        currentPage: pageTitles.servicePlanPageOfficeAdmin,
    }
}

const officeAdminFindServicePagePayload = () => {
    return {
        currentPage: pageTitles.findServicesPageOfficeAdmin,
    }
}

const officeAdminOfficeProfilePagePayload = () => {
    return {
        currentPage: pageTitles.officeProfilePageOfficeAdmin,
    }
}

const officeAdminSupportPagePayload = () => {
    return {
        currentPage: pageTitles.supportPageOfficeAdmin,
    }
}

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

const officeAdminAnnouncementsPagePayload = () => {
    return {
        currentPage: pageTitles.announcementsPageOfficeAdmin,
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
