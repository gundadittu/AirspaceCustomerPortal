import * as pageTitles from './pageTitles';

const getPagePayload = (pageName, payload) => { 
    switch (pageName) { 
        case pageTitles.homePageOfficeAdmin: 
            const officeUID = payload.officeUID || null;
            return officeAdminHomePagePayload(officeUID)
        case pageTitles.userPageOfficeAdmin: 
            return officeAdminUsersPagePayload()
        case pageTitles.homePageRegularUser: 
            return regularUserHomePagePayload()
        default: 
            return {}
    }
}
export default getPagePayload;

const regularUserHomePagePayload = (officeUID) => { 
    return { 
        currentPage: pageTitles.homePageRegularUser, 
        currentOfficeAdminUID: null, 
        regularUserPortalMode: 'regular'
    }
}

const officeAdminHomePagePayload = (officeUID) => { 
    return { 
        currentPage: pageTitles.homePageOfficeAdmin, 
        currentOfficeAdminUID: officeUID, 
        regularUserPortalMode: 'officeAdmin'
    }
}

 const officeAdminUsersPagePayload = () => { 
    return { 
        currentPage: pageTitles.userPageOfficeAdmin, 
    }
}