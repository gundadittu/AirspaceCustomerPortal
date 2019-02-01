export default class AirRegisteredGuest {
    constructor(dict) {
        const uid = dict.uid || null;
        if (uid === null) {
            return null
        }
        const name = dict.guestName || null;
        const email = dict.guestEmail || null;
        const arrived = dict.arrived || null;
        const canceled = dict.canceled || null;
        const expectedVisitDate = dict.expectedVisitDate || null;
        const hostUID = dict.hostUID || null;
        const visitingOfficeUID = dict.visitingOfficeUID || null;
        const visitingCompanyUID = dict.visitingCompanyUID || null;

        this.uid = uid;
        this.name = name;
        this.email = email;
        this.arrived = arrived;
        this.canceled = canceled;
        this.expectedVisitDate = expectedVisitDate;
        this.hostUID = hostUID;
        this.visitingOfficeUID = visitingOfficeUID;
        this.visitingCompanyUID = visitingCompanyUID;
    }
}
