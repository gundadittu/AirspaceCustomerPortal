import AirOffice from './AirOffice';

export default class AirConferenceRoom {
    constructor(dict) {
        const uid = dict.uid || null;
        if (uid === null) {
            return null
        }
        const name = dict.name || null;
        const offices = dict.offices || null;
        const amenities = dict.amenities || null;
        const capacity = dict.capacity || null;
        const address = dict.address || null;
        const active = dict.active || null;
        const reserveable = dict.reserveable || null;
        const imageURL = dict.imageURL || null;

        this.uid = uid;
        this.name = name;
        var airOffices = [];
        for(let key in offices) {
            const office = new AirOffice(offices[key]);
            if (office) {
                airOffices.push(office);
            }
        }
        this.offices = airOffices;
        this.amenities = amenities;//amenities.split();
        this.capacity = capacity;
        this.address = address;
        this.active = active;
        this.reserveable = reserveable;
        this.imageURL = imageURL
    }
}
