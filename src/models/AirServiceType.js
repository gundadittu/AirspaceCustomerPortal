var AirServiceRequestType = {
    infoTech: {
      rawValue: 'infoTech',
      title: 'IT'
    },
    plumbing: {
      rawValue: 'plumbing',
      title: 'Plumbing'
    },
    lighting: {
      rawValue: 'lighting',
      title: 'Lighting'
    },
    generalMaintenance: {
      rawValue: 'generalMaintenance',
      title: 'GeneralMaintenance'
    },
    furniture: {
      rawValue: 'furniture',
      title: 'Furniture'
    },
    door: {
      rawValue: 'door',
      title: 'Door'
    },
    heatingCooling: {
      rawValue: 'heatingCooling',
      title: 'Heating/Cooling'
    },
    cleaning: {
      rawValue: 'cleaning',
      title: 'Cleaning'
    },
    supplies: {
      rawValue: 'supplies',
      title: 'Supplies'
    }
}

export default class AirServiceType {

    constructor(type) {
        this.type = type;
        this.title = AirServiceRequestType[type.title];
        return
    }
}
