import * as serviceTitles from "../../constants/ServiceTitles";
import CoffeeImage from "../../assets/images/services/coffee.jpeg";
import ColdBrewImage from "../../assets/images/services/cold-brew.jpeg";
import SnacksImage from "../../assets/images/services/snacks.jpeg";
import AlcoholImage from "../../assets/images/services/alcohol.jpeg";
import FurnitureImage from "../../assets/images/services/furniture.jpg";
import ConferenceRoomImg from "../../assets/images/services/conference-room.jpeg";
import InternetImg from "../../assets/images/services/internet.jpeg";
import SuppliesImg from "../../assets/images/services/supplies.jpeg";
import WhiteboardImg from "../../assets/images/services/whiteboard.jpg";
import Accoustics from "../../assets/images/services/accoustics.jpg";
import Branding from "../../assets/images/services/branding.jpg";
import Moving from "../../assets/images/services/moving.jpeg";
import Plants from "../../assets/images/services/plants.jpeg";
import Security from "../../assets/images/services/security.jpeg";
import SpacePlanning from "../../assets/images/services/space-planning.jpeg";
import DeepClean from "../../assets/images/services/deep-cleaning.jpg";
import Catering from "../../assets/images/services/catering.jpg";
import Events from "../../assets/images/services/events.jpeg";
import OngoingCleaning from "../../assets/images/services/ongoing-cleaning.jpeg";
import Printing from "../../assets/images/services/printing.jpg";
import IT from "../../assets/images/services/it-services.jpeg";
import WasteRemoval from "../../assets/images/services/waste-removal.jpeg";
import PestControl from "../../assets/images/services/pest-control.jpg";
import FitnessClass from "../../assets/images/services/fitness-class.jpeg";
import WellnessEvent from "../../assets/images/services/wellness-event.jpeg";
import Postal from "../../assets/images/services/postal.jpeg";
import AVImg from "../../assets/images/services/av-equipment.jpg";
import GameNightImg from "../../assets/images/services/game-night.jpg";
import WaterImg from "../../assets/images/services/water.jpeg";
import HandyWorkImg from "../../assets/images/services/handy-work.jpeg";

export const CATEGORIES = {
    "FOOD_DRINK": "food-drink",
    "OFFICE_TECH": "office-tech",
    "OFFICE_HELP": "office-help",
    "CLEANING": "cleaning",
    "EVENTS": "events"
}

export const getDataSource = (type) => {
    let data = [];
    if (type === CATEGORIES["FOOD_DRINK"]) {
        data = [
            {
                image: getImageForServiceTitle(serviceTitles.COFFEE_TEA),
                title: serviceTitles.COFFEE_TEA,
                description: "We bring you the most iconic local brands to service all your fresh coffee, tea, and cold brew needs. Request to find out what coffee we can bring to your office."
            },
            {
                image: getImageForServiceTitle(serviceTitles.SNACKS_BEVS),
                title: serviceTitles.SNACKS_BEVS,
                description: "From healthy to premium, to guilty pleasures, we can bring your favorite drinks and snacks right to your office and keep it organized. Relax and enjoy your favorite bars and sparkling waters."
            },
            {
                image: getImageForServiceTitle(serviceTitles.KEG_DRINKS),
                title: serviceTitles.KEG_DRINKS,
                description: "Like fresh pours from a keg? So do we. Find out how Airspace can bring Chicago's iconic brands to your office."
            },
            {
                image: getImageForServiceTitle(serviceTitles.BEER_SPIRITS_WINE),
                title: serviceTitles.BEER_SPIRITS_WINE,
                description: "We take pride in serving your office with local craft beers. International and domestic? Yeah, we got that too. Find out more about how our vendors can service your office with an assortment of beers, spirits, and wines."
            },
            {
                image: getImageForServiceTitle(serviceTitles.WATER),
                title: serviceTitles.WATER,
                description: "Keep your office hydrated with our innovative and space-saving H2O solutions. Our team will help you match you with the best machine for the job, without sacrificing on storage or design."
            },
            {
                image: getImageForServiceTitle(serviceTitles.CATERING),
                title: serviceTitles.CATERING,
                description: "From Tuesday Cold Brews to office happy hours, to the yearly Christmas party, let Airspace take the hassle out of having fun."
            }
        ];
    } else if (type === CATEGORIES["OFFICE_TECH"]) {
        data = [
            {
                image: getImageForServiceTitle(serviceTitles.INTERNET),
                title: serviceTitles.INTERNET,
                description: "Diagnose slow internet speeds, spotty connections, and regular outages in your office. We'll get you up to speed in no time."
            },
            {
                image: getImageForServiceTitle(serviceTitles.CONFERENCE_ROOMS),
                title: serviceTitles.CONFERENCE_ROOMS,
                description: "From hardware to software, Airspace can power your conference rooms with technology that works and is easy to use...at a fraction of the cost."
            },
            {
                image: getImageForServiceTitle(serviceTitles.AV_EQUIPMENT),
                title: serviceTitles.AV_EQUIPMENT,
                description: "The Airspace team can meet all of your AV needs, like setting up your meeting rooms and common spaces. We also provide sleek digital displays that can add an elegant touch to hallways and reception areas, for wowing clients and keeping employees informed."
            },
            {
                image: getImageForServiceTitle(serviceTitles.IT_SERVICES),
                title: serviceTitles.IT_SERVICES,
                description: "Maximize business efficiency by working with an Airspace professional IT firm. We can cover all of your ongoing IT needs. Examples include: help desk support, managing software licenses and hardware purchases, setting up new devices, handling connectivity issues, and proactively providing insights and advice to improve your workspace productivity based on specific business needs."
            },
            {
                image: getImageForServiceTitle(serviceTitles.OFFICE_PRINTING),
                title: serviceTitles.OFFICE_PRINTING,
                description: "Avoid the headache of finding the right print solution for you office, let us match you with a print solution that works."
            }
        ];
    } else if (type === CATEGORIES["OFFICE_HELP"]) {
        data = [
            {
                image: getImageForServiceTitle(serviceTitles.SUPPLIES),
                title: serviceTitles.SUPPLIES,
                description: "We can keep your office stocked with all your supply needs, from the copy room to the kitchen. Couple your supplies with an Experience Manager package and we will handle inventory and stocking too, so that you can focus on running your business."
            },
            {
                image: getImageForServiceTitle(serviceTitles.HANDY_WORK),
                title: serviceTitles.HANDY_WORK,
                description: "Maintaining your space, from a simple picture hanging to major renovations, can seem like a daunting task. Whether it's connecting you with the right team or guiding you through the process, Airspace is here to solve your odd jobs, big and small."
            },
            {
                image: getImageForServiceTitle(serviceTitles.BRANDED_PRODUCTS),
                title: serviceTitles.BRANDED_PRODUCTS,
                description: "Add branding to your office space, reception area, and facade to ensure your brand is well represented. From flyers to a beautiful handcrafted sign, allow your Company to lead with its best foot forward."
            },
            {
                image: getImageForServiceTitle(serviceTitles.SHIPPING),
                title: serviceTitles.SHIPPING,
                description: "Whether you are closing a big deal or trying to impress a new client, shipping is important.  Let Airspace make shipping hassle-free with professional shipping services from your office to the destination."
            },
            {
                image: getImageForServiceTitle(serviceTitles.WRITABLE_SURFACES),
                title: serviceTitles.WRITABLE_SURFACES,
                description: "Turn any surface into a whiteboard. Write on everything. That's the philosophy at Airspace HQ--any wall or surface can be an effective visual for fostering collaboration and learning in your space."
            },
            {
                image: getImageForServiceTitle(serviceTitles.SOUNDPROOFING),
                title: serviceTitles.SOUNDPROOFING,
                description: "Nothing distracts teammates more than a noisy office. Tamper down the noise from neighboring workspaces with artistic panels and plants, or bring a sense of serenity to an open layout with an interactive habitat soundscape. Our solutions are bespoke to your space and budget."
            },
            {
                image: getImageForServiceTitle(serviceTitles.PLANTS),
                title: serviceTitles.PLANTS,
                description: "Plants are great for decorating office space––they literally breathe life into the air. If you don't have a green thumb, it can be hard to know which plants are best for your space and will thrive in your office environment. Set up a free consultation to help determine which high quality, nursery-grown plants would be best to install in your office. Inquire separately for weekly plant care services. And yes, we can hang and care for them too."
            },
            {
                image: getImageForServiceTitle(serviceTitles.FURNITURE),
                title: serviceTitles.FURNITURE,
                description: "Furniture is not only functional, but an important statement about your space. We work alongside expert space planners to curate bespoke furniture solutions that match your budget and vibe. Our options are flexible and include installation and warranty."
            },
            {
                image: getImageForServiceTitle(serviceTitles.HEALTH_WELLNESS),
                title: serviceTitles.HEALTH_WELLNESS,
                description: "Do you know what's in the air you're breathing? Airspace monitors and analyzes a number of factors, from air quality to employee ergonomics, to provide actionable solutions that target the productivity, health, and wellbeing of your team."
            },
            {
                image: getImageForServiceTitle(serviceTitles.OFFICE_MOVE),
                title: serviceTitles.OFFICE_MOVE,
                description: "Office moves are a ton of work! Let Airspace help with the process from start to end and have you up and running in no time. Our comprehensive checklists ensure that nothing is left behind and that your new space is truly plug-n-play."
            },
            {
                image: getImageForServiceTitle(serviceTitles.SPACE_MANAGEMENT),
                title: serviceTitles.SPACE_MANAGEMENT,
                description: "Not sure where to begin on your next big project? Work with our team of expert space management professionals and advisers to curate a standout work environment that accommodates the needs of your team now and for years to come."
            },
            {
                image: getImageForServiceTitle(serviceTitles.SECURITY),
                title: serviceTitles.SECURITY,
                description: "Airspace offers a comprehensive array of office security features, from basic locksmith services to advanced recognition systems. Get started on your general security consultation today by answering the questions below."
            }
        ];
    } else if (type === CATEGORIES["CLEANING"]) {
        data = [
            {
                image: getImageForServiceTitle(serviceTitles.ONGOING_CLEANING),
                title: serviceTitles.ONGOING_CLEANING,
                description: "With any shared space, dust and dirt can accumulate quickly. Based on your office size and needs, you can schedule evening cleaning to ensure a clean office each morning."
            },
            {
                image: getImageForServiceTitle(serviceTitles.DEEP_CLEANING),
                title: serviceTitles.DEEP_CLEANING,
                description: "Moving out? Need a monthly reset on your space? Serious about the environmental health of your team? Opt for a one-off or recurring deep cleaning service to sanitize your office and refresh your team."
            },
            {
                image: getImageForServiceTitle(serviceTitles.SPECIALIZED_CLEANING),
                title: serviceTitles.SPECIALIZED_CLEANING,
                description: "Need help with a special clean job? From the window to the wall, find out how our specialist partners can help with all of your clean jobs, big or small."
            },
            {
                image: getImageForServiceTitle(serviceTitles.WASTE_REMOVAL),
                title: serviceTitles.WASTE_REMOVAL,
                description: "Want to finally launch your Company's compost initiative but not quite sure where to begin? Heavy trash too? Let Airspace take the lead and setup a sustainable program that's as easy on your team as it is on the environment. Fill out the below questions to get started."
            },
        ]
    } else if (type === CATEGORIES["EVENTS"]) {
        data = [
            {
                image: getImageForServiceTitle(serviceTitles.HAPPY_HOUR),
                title: serviceTitles.HAPPY_HOUR,
                description: "From Tuesday Cold Brews to office happy hours, to the yearly Christmas party, let Airspace take the hassle out of having fun."
            },
            {
                image: getImageForServiceTitle(serviceTitles.GAME_NIGHT),
                title: serviceTitles.GAME_NIGHT,
                description: "Be a kid again and take a trip through memory lane with classic games from your childhood. Choose from yard games, board games, card games, or a themed trivia night."
            },
            {
                image: getImageForServiceTitle(serviceTitles.HEALTH_FITNESS_PROGRAMMING),
                title: serviceTitles.HEALTH_FITNESS_PROGRAMMING,
                description: "Build wellbeing into the core of your community with our series of comprehensive health and wellness programming. With everything from yoga classes to specialized wellness consultations, our experts will find the right events to fit your team's health and wellness goals."
            },
            {
                image: getImageForServiceTitle(serviceTitles.EVENT_PLANNING),
                title: serviceTitles.EVENT_PLANNING,
                description: "From Tuesday Cold Brews to office happy hours, to the yearly Christmas party, let Airspace take the hassle out of having fun."
            },
        ]
    }
    return data;
}

export const getImageForServiceTitle = (title) => {
    switch (title) {
        case serviceTitles.COFFEE_TEA:
            return CoffeeImage
        case serviceTitles.SNACKS_BEVS:
            return SnacksImage
        case serviceTitles.KEG_DRINKS:
            return ColdBrewImage
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
            return WellnessEvent
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
            return Catering
        case serviceTitles.GAME_NIGHT:
            return GameNightImg
        case serviceTitles.HEALTH_FITNESS_PROGRAMMING:
            return FitnessClass
        case serviceTitles.EVENT_PLANNING:
            return Events
        default:
            return null
    }
}