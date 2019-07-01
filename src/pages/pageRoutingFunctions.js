import * as pageTitles from './pageTitles';

const getPagePayload = (pageName, payload) => {
    switch (pageName) {
        case pageTitles.healthReportPageOfficeAdmin:
            return {
                currentPage: pageTitles.healthReportPageOfficeAdmin,
            }
        case pageTitles.homePageLandlord:
            const buildingUID = payload.buildingUID || null;
            const buildingObj = payload.buildingObj || null;
            return landlordHomePagePayload(buildingUID, buildingObj);
        case pageTitles.buildingHealthLandlord:
            return landlordBuildingHealthPayload();
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
        case pageTitles.experienceManagerPageOfficeAdmin:
            return officeAdminEMPagePayload()
        default:
            return {}
    }
}
export default getPagePayload;

const landlordBuildingHealthPayload = () => {
    return {
        currentPage: pageTitles.buildingHealthLandlord,
    }
}

const landlordHomePagePayload = (uid, obj) => {
    return {
        currentPage: pageTitles.homePageLandlord,
        currentBuildingUID: uid,
        currentBuilding: obj,
    }
}

const officeAdminEMPagePayload = () => {
    return {
        currentPage: pageTitles.experienceManagerPageOfficeAdmin,
    }
}

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
