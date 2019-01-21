import { getAirNotificationTypeFor } from './AirNotificationType';

export default class AirNotification { 
    constructor(dict) {         
        this.uid = dict.uid || null;
        if (this.uid == null) { 
            return null
        }
        this.title = dict.title || null;
        this.body = dict.body || null;
        // this.readStatus = booleanDict.readStatus || null;
        const type = getAirNotificationTypeFor(dict.type);
        if (type == null) { 
            return null
        }
        this.type = type;
        
        // need to load time stamp value 
    }
}



// var uid: String?
//     var type: AirNotificationType?
//     var readStatus: Bool?
//     var data: [String: Any]?
//     var timestamp: Date?
//     var title: String?
//     var body: String?