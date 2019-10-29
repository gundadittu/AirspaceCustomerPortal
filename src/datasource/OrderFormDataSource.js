import * as serviceTitles from "../constants/ServiceTitles";
import CoffeeImage from "../assets/images/services/coffee.jpeg";
import SnacksImage from "../assets/images/services/snacks.jpeg";
import AlcoholImage from "../assets/images/services/alcohol.jpeg";
import FurnitureImage from "../assets/images/services/furniture.jpg";
import ConferenceRoomImg from "../assets/images/services/conference-room.jpeg";
import InternetImg from "../assets/images/services/internet.jpeg";
import SuppliesImg from "../assets/images/services/supplies.jpeg";
import WhiteboardImg from "../assets/images/services/whiteboard.jpg";
import Accoustics from "../assets/images/services/accoustics.jpg";
import Branding from "../assets/images/services/branding.jpg";
import Moving from "../assets/images/services/moving.jpeg";
import Plants from "../assets/images/services/plants.jpeg";
import Security from "../assets/images/services/security.jpeg";
import SpacePlanning from "../assets/images/services/space-planning.jpeg";
import DeepClean from "../assets/images/services/deep-cleaning.jpg";
import Catering from "../assets/images/services/catering.jpg";
import Events from "../assets/images/services/events.jpeg";
import OngoingCleaning from "../assets/images/services/ongoing-cleaning.jpeg";
import Printing from "../assets/images/services/printing.jpg";
import IT from "../assets/images/services/it-services.jpeg";
import WasteRemoval from "../assets/images/services/waste-removal.jpeg";
import PestControl from "../assets/images/services/pest-control.jpg";
import Postal from "../assets/images/services/postal.jpeg";
import AVImg from "../assets/images/services/av-equipment.jpg";
import GameNightImg from "../assets/images/services/game-night.jpg";
import WaterImg from "../assets/images/services/water.jpeg";
import HandyWorkImg from "../assets/images/services/handy-work.jpeg";
import DailyHealthWellnessImg from "../assets/images/services/daily-health-wellness.jpg";
import HappyHourImg from "../assets/images/services/happy-hour.jpg";
import HealthWellnessProgrammingImg from "../assets/images/services/health-wellness-programming.jpeg";
import KeggedDrinksImg from "../assets/images/services/kegged-drinks.jpeg";
import OtherImg from "../assets/images/services/other.jpeg";

export const CATEGORIES = {
    "FOOD_DRINK": "food-drink",
    "OFFICE_TECH": "office-tech",
    "OFFICE_HELP": "office-help",
    "CLEANING": "cleaning",
    "EVENTS": "events"
}

export const getDescriptionForServiceTitle = (title) => {
    switch (title) { 
        case serviceTitles.COFFEE_TEA:
                return "We bring you the most iconic local brands to service all your fresh coffee, tea, and cold brew needs. Request to find out what coffee we can bring to your office."
            case serviceTitles.SNACKS_BEVS:
                return "From healthy to premium, to guilty pleasures, we can bring your favorite drinks and snacks right to your office and keep it organized. Relax and enjoy your favorite bars and sparkling waters."
            case serviceTitles.KEG_DRINKS:
                return "Like fresh pours from a keg? So do we. Find out how Airspace can bring Chicago's iconic brands to your office."
            case serviceTitles.BEER_SPIRITS_WINE:
                return "We take pride in serving your office with local craft beers. International and domestic? Yeah, we got that too. Find out more about how our vendors can service your office with an assortment of beers, spirits, and wines."
            case serviceTitles.WATER:
                return "Keep your office hydrated with our innovative and space-saving H2O solutions. Our team will help you match you with the best machine for the job, without sacrificing on storage or design."
            case serviceTitles.CATERING:
                return "From Tuesday Cold Brews to office happy hours, to the yearly Christmas party, let Airspace take the hassle out of having fun."
            case serviceTitles.INTERNET:
                return "Diagnose slow internet speeds, spotty connections, and regular outages in your office. We'll get you up to speed in no time."
            case serviceTitles.CONFERENCE_ROOMS:
                return "From hardware to software, Airspace can power your conference rooms with technology that works and is easy to use...at a fraction of the cost."
            case serviceTitles.AV_EQUIPMENT:
                return "The Airspace team can meet all of your AV needs, like setting up your meeting rooms and common spaces. We also provide sleek digital displays that can add an elegant touch to hallways and reception areas, for wowing clients and keeping employees informed."
            case serviceTitles.IT_SERVICES:
                return "Maximize business efficiency by working with an Airspace professional IT firm. We can cover all of your ongoing IT needs. Examples include: help desk support, managing software licenses and hardware purchases, setting up new devices, handling connectivity issues, and proactively providing insights and advice to improve your workspace productivity based on specific business needs."
            case serviceTitles.OFFICE_PRINTING:
                return "Avoid the headache of finding the right print solution for you office, let us match you with a print solution that works."
            case serviceTitles.OFFICE_MOVE:
                return "Office moves are a ton of work! Let Airspace help with the process from start to end and have you up and running in no time. Our comprehensive checklists ensure that nothing is left behind and that your new space is truly plug-n-play."
            case serviceTitles.SUPPLIES:
                return "We can keep your office stocked with all your supply needs, from the copy room to the kitchen. Couple your supplies with an Experience Manager package and we will handle inventory and stocking too, so that you can focus on running your business."
            case serviceTitles.HANDY_WORK:
                return "Maintaining your space, from a simple picture hanging to major renovations, can seem like a daunting task. Whether it's connecting you with the right team or guiding you through the process, Airspace is here to solve your odd jobs, big and small."
            case serviceTitles.BRANDED_PRODUCTS:
                return "Add branding to your office space, reception area, and facade to ensure your brand is well represented. From flyers to a beautiful handcrafted sign, allow your Company to lead with its best foot forward."
            case serviceTitles.SHIPPING:
                return "Whether you are closing a big deal or trying to impress a new client, shipping is important.  Let Airspace make shipping hassle-free with professional shipping services from your office to the destination."
            case serviceTitles.WRITABLE_SURFACES:
                return "Turn any surface into a whiteboard. Write on everything. That's the philosophy at Airspace HQ--any wall or surface can be an effective visual for fostering collaboration and learning in your space."
            case serviceTitles.SOUNDPROOFING:
                return "Nothing distracts teammates more than a noisy office. Tamper down the noise from neighboring workspaces with artistic panels and plants, or bring a sense of serenity to an open layout with an interactive habitat soundscape. Our solutions are bespoke to your space and budget."
            case serviceTitles.PLANTS:
                return "Plants are great for decorating office space––they literally breathe life into the air. If you don't have a green thumb, it can be hard to know which plants are best for your space and will thrive in your office environment. Set up a free consultation to help determine which high quality, nursery-grown plants would be best to install in your office. Inquire separately for weekly plant care services. And yes, we can hang and care for them too."
            case serviceTitles.FURNITURE:
                return "Furniture is not only functional, but an important statement about your space. We work alongside expert space planners to curate bespoke furniture solutions that match your budget and vibe. Our options are flexible and include installation and warranty."
            case serviceTitles.HEALTH_WELLNESS:
                return "Do you know what's in the air you're breathing? Airspace monitors and analyzes a number of factors, from air quality to employee ergonomics, to provide actionable solutions that target the productivity, health, and wellbeing of your team."
            case serviceTitles.SPACE_MANAGEMENT:
                return "Not sure where to begin on your next big project? Work with our team of expert space management professionals and advisers to curate a standout work environment that accommodates the needs of your team now and for years to come."
            case serviceTitles.SECURITY:
                return "Airspace offers a comprehensive array of office security features, from basic locksmith services to advanced recognition systems. Get started on your general security consultation today by answering the questions below."
            case serviceTitles.ONGOING_CLEANING:
                return "With any shared space, dust and dirt can accumulate quickly. Based on your office size and needs, you can schedule evening cleaning to ensure a clean office each morning."
            case serviceTitles.DEEP_CLEANING:
                return "Moving out? Need a monthly reset on your space? Serious about the environmental health of your team? Opt for a one-off or recurring deep cleaning service to sanitize your office and refresh your team."
            case serviceTitles.SPECIALIZED_CLEANING:
                return "Need help with a special clean job? From the window to the wall, find out how our specialist partners can help with all of your clean jobs, big or small."
            case serviceTitles.WASTE_REMOVAL:
                return "Want to finally launch your company's compost initiative but not quite sure where to begin? Heavy trash too? Let Airspace take the lead and setup a sustainable program that's as easy on your team as it is on the environment. Fill out the below questions to get started."
            case serviceTitles.HAPPY_HOUR:
                return "From Tuesday Cold Brews to office happy hours, to the yearly Christmas party, let Airspace take the hassle out of having fun."
            case serviceTitles.GAME_NIGHT:
                return "Be a kid again and take a trip through memory lane with classic games from your childhood. Choose from yard games, board games, card games, or a themed trivia night."
            case serviceTitles.HEALTH_FITNESS_PROGRAMMING:
                return "Build well-being into the core of your community with our series of comprehensive health and wellness programming. With everything from yoga classes to wellness consultations, our experts will find the right events to fit your team's health and wellness goals."
            case serviceTitles.EVENT_PLANNING:
                return "From office happy hours to Christmas parties, let Airspace take the hassle out of having fun."
            case serviceTitles.OTHER_SERVICES: 
                return "Don’t see a service you want? Let your experience manager help you find it."
            default:
                return ""
    }
}
export const getImageForServiceTitle = (title) => {
    switch (title) {
        case serviceTitles.COFFEE_TEA:
            return CoffeeImage
        case serviceTitles.SNACKS_BEVS:
            return SnacksImage
        case serviceTitles.KEG_DRINKS:
            return KeggedDrinksImg
        case serviceTitles.BEER_SPIRITS_WINE:
            return AlcoholImage
        case serviceTitles.WATER:
            return WaterImg
        case serviceTitles.CATERING:
            return Catering
        case serviceTitles.INTERNET:
            return InternetImg
        case serviceTitles.CONFERENCE_ROOMS:
            return ConferenceRoomImg
        case serviceTitles.AV_EQUIPMENT:
            return AVImg
        case serviceTitles.IT_SERVICES:
            return IT
        case serviceTitles.OFFICE_PRINTING:
            return Printing
        case serviceTitles.OFFICE_MOVE:
            return Moving
        case serviceTitles.SUPPLIES:
            return SuppliesImg
        case serviceTitles.HANDY_WORK:
            return HandyWorkImg
        case serviceTitles.BRANDED_PRODUCTS:
            return Branding
        case serviceTitles.SHIPPING:
            return Postal
        case serviceTitles.WRITABLE_SURFACES:
            return WhiteboardImg
        case serviceTitles.SOUNDPROOFING:
            return Accoustics
        case serviceTitles.PLANTS:
            return Plants
        case serviceTitles.FURNITURE:
            return FurnitureImage
        case serviceTitles.HEALTH_WELLNESS:
            return DailyHealthWellnessImg
        case serviceTitles.SPACE_MANAGEMENT:
            return SpacePlanning
        case serviceTitles.SECURITY:
            return Security
        case serviceTitles.ONGOING_CLEANING:
            return OngoingCleaning
        case serviceTitles.DEEP_CLEANING:
            return DeepClean
        case serviceTitles.SPECIALIZED_CLEANING:
            return PestControl
        case serviceTitles.WASTE_REMOVAL:
            return WasteRemoval
        case serviceTitles.HAPPY_HOUR:
            return HappyHourImg
        case serviceTitles.GAME_NIGHT:
            return GameNightImg
        case serviceTitles.HEALTH_FITNESS_PROGRAMMING:
            return HealthWellnessProgrammingImg
        case serviceTitles.EVENT_PLANNING:
            return Events
        case serviceTitles.OTHER_SERVICES:
            return OtherImg
        default:
            return null
    }
}