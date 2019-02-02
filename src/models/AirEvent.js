import AirOffice from './AirOffice';

export default class AirEvent  {
    constructor(dict) {
        const uid = dict.uid || null;
        if (uid === null) {
            return null
        }

        const title = dict.title || null;
        const offices = dict.offices || null;
        const startDate = dict.startDate || null;
        const endDate = dict.endDat || null;
        const address = dict.address || null;
        const canceld = dict.canceld || null;
        const description = dict.description || null;

        this.uid = uid;
        this.title = title;
        var airOffices = [];
        for(let key in offices) {
            const office = new AirOffice(offices[key]);
            if (office) {
                airOffices.push(office);
            }
        }
        this.offices = airOffices;
        this.startDate = startDate;
        this.endDate = endDate;
        this.address = address;
        this.canceled = canceled;
        this.description = description;
    }
}
