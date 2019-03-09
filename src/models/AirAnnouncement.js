export default class AirAnnouncement {
    constructor(dict) {
        const uid = dict.uid || null;
        if (uid === null) {
            return null
        }

        const message = dict.message || null;
        const officeUID = dict.officeUID || null;
        const userUID = dict.userUID || null;
        const stamp = dict.timestamp || null;
        if (stamp) {
            const seconds = stamp._seconds;
            const nanoseconds = stamp._nanoseconds;
            const ts =  new firebase.firestore.Timestamp(seconds, nanoseconds);
            this.stamp = ts.toDate();
        }

        this.messsage = message;
        this.userUID = userUID;
        this.officeUID = officeUID;
        this.uid = uid;
    }
}
