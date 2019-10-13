import * as serviceTitles from "../constants/ServiceTitles";
import * as orderFormDataSource from "./OrderFormDataSource"; 

export const CATEGORIES = {
    "FOOD_DRINK": "food-drink",
    "OFFICE_TECH": "office-tech",
    "OFFICE_HELP": "office-help",
    "CLEANING": "cleaning",
    "EVENTS": "events"
}

export const getServiceCategoriesForFindServicesPage = (type) => {
    let serviceList = []
    if (type === CATEGORIES["FOOD_DRINK"]) {
        serviceList = [serviceTitles.COFFEE_TEA, serviceTitles.SNACKS_BEVS, serviceTitles.KEG_DRINKS, serviceTitles.BEER_SPIRITS_WINE, serviceTitles.WATER, serviceTitles.CATERING, serviceTitles.OTHER_SERVICES]
    } else if (type === CATEGORIES["OFFICE_TECH"]) {
        serviceList = [serviceTitles.INTERNET, serviceTitles.CONFERENCE_ROOMS, serviceTitles.AV_EQUIPMENT, serviceTitles.IT_SERVICES, serviceTitles.OFFICE_PRINTING, serviceTitles.OTHER_SERVICES]
    } else if (type === CATEGORIES["OFFICE_HELP"]) {
        serviceList = [serviceTitles.SUPPLIES, serviceTitles.HANDY_WORK, serviceTitles.BRANDED_PRODUCTS, serviceTitles.SHIPPING, serviceTitles.WRITABLE_SURFACES, serviceTitles.SOUNDPROOFING, serviceTitles.PLANTS, serviceTitles.FURNITURE, serviceTitles.HEALTH_WELLNESS, serviceTitles.OFFICE_MOVE, serviceTitles.SPACE_MANAGEMENT, serviceTitles.SECURITY, serviceTitles.OTHER_SERVICES] 
    } else if (type === CATEGORIES["CLEANING"]) {
        serviceList = [ serviceTitles.ONGOING_CLEANING, serviceTitles.DEEP_CLEANING, serviceTitles.SPECIALIZED_CLEANING, serviceTitles.WASTE_REMOVAL, serviceTitles.OTHER_SERVICES]
    } else if (type === CATEGORIES["EVENTS"]) {
        serviceList = [serviceTitles.HAPPY_HOUR, serviceTitles.GAME_NIGHT, serviceTitles.HEALTH_FITNESS_PROGRAMMING, serviceTitles.EVENT_PLANNING, serviceTitles.OTHER_SERVICES]
    }

    const data = serviceList.map( x => (
        {
            title: x, 
            image: orderFormDataSource.getImageForServiceTitle(x), 
            shortDescription: orderFormDataSource.getDescriptionForServiceTitle(x)
        }
    ))
    return data;
}