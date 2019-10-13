import * as serviceTitles from '../../constants/ServiceTitles';
const anythingElseQuestionText = "Is there anything else your Experience Manager should know?"; 
const addOnServiceQuestionText = "Add-on Services:";

export const FIELD_TYPES = { 
    "TEXT": "text",
    "INPUT_GROUP": "inputGroup",  
    "DATE_TIME": "dateTime", 
    "DATE": "date", 
    "TITLE": "title", 
    "NUMBER": "number",
    "SELECT": "select", 
    "SELECT_MULTIPLE": "selectMultiple",
    "SELECT_MULTIPLE_GROUPED": "selectMultipleGrouped", 
    "CASCADER": "cascader", 
    "TEXT_AREA": "textArea", 
    "FILE_UPLOAD": "fileUpload"
}

export const getFieldsForService = (serviceTitle) => {
    if (serviceTitle === null) {
        return [];
    } else if (serviceTitle === serviceTitles.COFFEE_TEA) {
        return [
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Machine Type(s)",
                question: "What machine(s) does your office need?",
                required: true,
                data: {
                    options: ["Fresh Brew", "Single Serve (K-cup)", "Bean-to-Cup", "Not Sure, need help", "None"]
                }, 
                autofocus: true
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Coffee Type(s)",
                question: "What type of coffee(s) would your office like?",
                required: true,
                data: {
                    options: ["Basic Coffee (ex: Starbucks, Green Mountain, Tully's, etc.)", "Local Coffee (ex: Intelligentsia, Limitless, etc.) ", "Bottled Coffee", "Other (specify at end)", "None"]
                }
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Tea Type(s)",
                question: "What type of tea(s) would your office like?",
                required: true,
                data: {
                    options: ["Basic Tea (ex: Bigelow, Tazo, etc.)", "Local Tea (ex: Intelligentsia, etc.) ", "Bottled Tea", "Other (specify at end)", "None"]
                }
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Add-on",
                question: addOnServiceQuestionText,
                required: false,
                data: {
                    options: ["Inventory & Stocking", "Display Cases & Organizers", "Machine Purchase/Rental", "Pantry Supplies (ex: creamer, sweeteners, stirrers, cups, sleeves, etc.)"]
                }
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Notes",
                question: anythingElseQuestionText,
                required: false,
            },
            {
                type: FIELD_TYPES["FILE_UPLOAD"], 
                key: "Attachments", 
                question: "Please upload photos of where your coffee and/or tea will be served (including plumbing and electrical):",
                required: false
            }
        ];
    } else if (serviceTitle === serviceTitles.SNACKS_BEVS) {
        return [
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Snack Type(s)",
                question: "What types of snack(s) would your office like?",
                required: true,
                data: {
                    options: ["Basic Snacks (e.x. chips, nuts, bars, popcorn, etc.)", "Healthy Snacks (ex: health bars, jerky, dried fruit, yogurt, etc.)", "Fresh Fruit (ex: apples, bananas, citrus, etc.)", "Other (specify at end)", "None"]
                }
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Drink Type(s)",
                question: "What type of drink(s) would your office like?",
                required: true,
                data: {
                    options: ["Basic Drinks (ex: sparkling water, iced tea, soda, diet, etc.)", "Healthy Drinks (ex: kombucha, Bai, Honest, POM, etc.)", "Beer + Wine + Spirits", "Other (specify at end)", "None"]
                }
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Add-ons",
                question: addOnServiceQuestionText,
                required: false,
                data: {
                    options: ["Inventory & Stocking", "Display Cases & Organizers", "Refrigerator Purchase/Rental", "Pantry Supplies (ex: creamer, sweeteners, stirrers, cups, sleeves, etc.)"]
                }
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Notes",
                question: anythingElseQuestionText,
                required: false,
            },
            {
                type: FIELD_TYPES["FILE_UPLOAD"], 
                key: "Attachments", 
                question: "Please upload photos of where the snacks and/or drinks will be stocked:",
                required: false
            }
        ];
    } else if (serviceTitle === serviceTitles.KEG_DRINKS) { 
        return [ 
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Keg Service(s)",
                question: "What keg service(s) does your office need?",
                required: true,
                data: {
                    options: ["Original Cold Brew", "Nitro Cold Brew", "Beer", "Kombucha", "Matcha Tea", "Other (specify at end)"]
                }
            },  
            {
                type: FIELD_TYPES["NUMBER"],
                key: "People Count",
                question: "How many people will need to be served?",
                required: true,
            },
            {
                type: FIELD_TYPES["DATE_TIME"],
                key: "Delivery Time",
                question: "When would your office want the drinks delivered?",
                required: true,
            }, 
            {
                type: FIELD_TYPES["TEXT"],
                key: "Delivery Schedule",
                question: "How often would your office like delivery?",
                required: true
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Add-on",
                question: addOnServiceQuestionText,
                required: false,
                data: {
                    options: ["Kegerator Equipment", "Pantry Supplies (ex: creamer, sweeteners, stirrers, cups, sleeves, etc.)", "Catering"]
                }
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Notes",
                question: anythingElseQuestionText,
                required: false,
            },
            {
                type: FIELD_TYPES["FILE_UPLOAD"], 
                key: "Attachments", 
                question: "Please upload photos of where you would like the kegerator placed:",
                required: false
            }
        ];
    } else if (serviceTitle === serviceTitles.BEER_SPIRITS_WINE) {
        return [
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Beer Type(s)",
                question: "What beer(s) would your office like?",
                required: true,
                data: {
                    options: ["Local", "Domestic", "International", "Other (specify below)", "None"]
                }
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Wine Type(s)",
                question: "What wine(s) would your office like?",
                required: true,
                data: {
                    options: ["Red", "White", "Rose", "Champagne", "Other (specify below)", "None"]
                }
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Spirit Type(s)",
                question: "What spirit(s) would your office like?",
                required: true,
                data: {
                    options: ["Rum", "Vodka", "Bourbon", "Gin", "Whiskey", "Tequilla","Other (specify below)", "None"]
                }
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Add-ons",
                question: addOnServiceQuestionText,
                required: false,
                data: {
                    options: ["Kegerator Service", "Pantry Supplies (ex: creamer, sweeteners, stirrers, cups, sleeves, etc.)", "Branded Koozies", "Catering"]
                }
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Notes",
                question: "Add any extra notes on necessary drinks here:",
                required: false,
            },  
            {
                type:  FIELD_TYPES["NUMBER"],
                key: "People Count",
                question: "How many people are you ordering for?",
                required: true,
            },
            {
                type:  FIELD_TYPES["DATE_TIME"],
                key: "Delivery Time",
                question: "When would your office want the drinks delivered?",
                required: true,
            }, 
            {
                type: FIELD_TYPES["TEXT"],
                key: "Delivery Schedule",
                question: "How often would your office like delivery?",
                required: true
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Notes",
                question: anythingElseQuestionText,
                required: false,
            },
            {
                type: FIELD_TYPES["FILE_UPLOAD"], 
                key: "Attachments", 
                question: "Please upload photos of where the alcohol will be stocked:",
                required: false
            }
        ];
    } else if (serviceTitle === serviceTitles.WATER) {
        return [ 
            {
                type: FIELD_TYPES["SELECT"],
                key: "Machine Type(s)",
                question: "What type of machine(s) does your office need?",
                required: true,
                data: {
                    options: ["Freestanding", "Countertop", "Undercounter (spout)", "Not sure, need help", "None"]
                }
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Features",
                question: "What features does your office need?",
                required: true,
                data: {
                    options: ["Cold Water", "Hot Water", "Ice", "Sparkling Water"]
                }
            },
            {
                type: FIELD_TYPES["SELECT"],
                key: "Purchase Preference",
                question: "Would you prefer to purchase or rent?",
                required: true,
                data: {
                    options: ["Purchase", "Rent"]
                }
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Notes",
                question: anythingElseQuestionText,
                required: false,
            },
            {
                type: FIELD_TYPES["FILE_UPLOAD"], 
                key: "Attachments", 
                question: "Please upload photos of where the machine will be located (including plumbing and electric):",
                required: false
            }
        ];
    } else if (serviceTitle === serviceTitles.CATERING) {
        return [
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Catering Events",
                question: "What event(s) does your office need catering for?",
                required: true,
                data: {
                    options: ["Breakfast", "Lunch", "Dinner", "Happy Hour", "Light Snacks", "Other (specify at end)"]
                }
            },
            {
                type: FIELD_TYPES["NUMBER"],
                key: "People Count",
                question: "How many people are you ordering for?",
                required: true,
            },
            {
                type: FIELD_TYPES["DATE_TIME"],
                key: "Delivery Time",
                question: "When would your office need this catering delivered?",
                required: true,
            },
            {
                type: FIELD_TYPES["TEXT"],
                key: "Delivery Schedule",
                question: "How often would your office need delivery?",
                required: true,
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Dietary Restrictions",
                question: "Does your office have any dietary restriction(s)?",
                required: true,
                data: {
                    options: ["Vegetarian", "Vegan", "Gluten Allergy", "Nut Allergy", "Dairy Intolerance", "Diabetic", "Kosher", "Halal", "None", "Other (specify below)"]
                }
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Dietary Restriction Notes",
                question: "Add any extra notes regarding dietary restrictions here:",
                required: false,
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Add-ons",
                question: addOnServiceQuestionText,
                required: false,
                data: {
                    options: ["Pantry Supplies (ex: silverware, napkins, plates, cups, tablecloths, ice, etc.)", "Branding & Signs", "Serving Staff", "Event Planning"]
                }
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Notes",
                question: anythingElseQuestionText,
                required: false,
            },
            {
                type: FIELD_TYPES["FILE_UPLOAD"], 
                key: "Attachments", 
                question: "Please upload photos of where the catering will be served:",
                required: false
            }
        ];
    } else if (serviceTitle === serviceTitles.INTERNET) {
        return [
            {
                type: FIELD_TYPES["SELECT"],
                key: "Current ISP",
                question: "Who is your office's current Internet Service Provider (ISP)?",
                required: true,
                data: {
                    options: ["Comcast", "ATT", "Verion Fios", "Spectrum", "Cogent", "Other", "Not Sure", "No Current Provider"]
                }
            },
            {
                type: FIELD_TYPES["NUMBER"],
                key: "People Count",
                question: "Approximately, how many people will be using this internet concurrently?",
                required: true,
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Internet Usage",
                question: "What does your office use internet for?",
                required: true,
                data: {
                    options: ["Web Browsing & Email", "File Sharing", "Video Streaming & Conferencing", "E-Commerce", "Cloud Computing & Storage", "Sever Hosting", "Hard Lines", "Phone Lines", "Other (specify at end)"]
                }
            },
            {
                type:  FIELD_TYPES["DATE"],
                key: "Set Up Date",
                question: "When would your office need the internet set up by?",
                required: true,
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Add-ons",
                question: addOnServiceQuestionText,
                required: false,
                data: {
                    options: ["Emergency Backup Internet", "VOIP", "Cyber Security + Firewall", "Other IT Service", "Help with an Office Move"]
                }
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Notes",
                question: anythingElseQuestionText,
                required: false,
            },
            {
                type: FIELD_TYPES["FILE_UPLOAD"], 
                key: "Attachments", 
                question: "Please upload photos of any existing network configurations:",
                required: false
            }
        ];
    } else if (serviceTitle === serviceTitles.CONFERENCE_ROOMS) {
        return [
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Conference Room Needs",
                question: "Please describe your office's conference room needs: (ex: # of rooms, people count, video, audio)",
                required: false,
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Preferred Conferencing Software",
                question: "What conferencing software(s) does your office prefer?",
                required: false,
                data: {
                    options: ["Skype", "Zoom", "Uber Conference", "Google Hangouts", "Other (specify at end)", "No Preference"]
                }
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Add-ons",
                question: addOnServiceQuestionText,
                required: false,
                data: {
                    options: ["Hardware (camera, mic, screen, etc.)", "Roaming Conference Accounts", "Soundproofing", "Other IT Services"]
                }
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Notes",
                question: anythingElseQuestionText,
                required: false,
            }, 
            {
                type: FIELD_TYPES["FILE_UPLOAD"], 
                key: "Attachments", 
                question: "Please upload photos of your conference rooms, including existing configurations:",
                required: false
            }
        ];
    } else if (serviceTitle === serviceTitles.AV_EQUIPMENT) {
        return [ 
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "AV Needs",
                question: "What does your office need AV help with?",
                required: true,
                data: {
                    options: ["Workstations", "Meeting/Conference Rooms", "Large Room AV Sytems", "Digital Signage", "Video Wall", "Other (specify at end)"]
                }
            }, 
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Add-ons",
                question: addOnServiceQuestionText,
                required: false,
                data: {
                    options: ["Conferencing Software", "Soundproofing", "Other IT Services"]
                }
            }, 
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Notes",
                question: anythingElseQuestionText,
                required: false,
            },
            {
                type: FIELD_TYPES["FILE_UPLOAD"], 
                key: "Attachments", 
                question: "Please upload photos of your conference rooms, including existing configurations:",
                required: false
            }, 
            {
                type: FIELD_TYPES["FILE_UPLOAD"], 
                key: "Attachments", 
                question: "Please upload photos of where you would like the system set up and any existing configurations:",
                required: false
            }
        ];
    } else if (serviceTitle === serviceTitles.IT_SERVICES) {
        return [
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "IT Needs",
                question: "What does your office need help with?",
                required: true,
                data: {
                    options: ["Employee Onboarding", "Desktop Support", "Email Support", "Anti-virus Software", "System Maintenance", "Wifi Setup", "Firewall Support", "Cyber Security", "Printers", "Screen Mounting", "Security Cameras", "Smart devices", "Other (specify below)" ]
                }
            }, 
            {
                type: FIELD_TYPES["SELECT"],
                key: "Support Level",
                question: "What level of support does your office require?",
                required: true,
                data: {
                    options: ["24/7", "Business Hours", "Sporadic Needs (vary)", "One-off", "Not sure, need help"]
                }
            }, 
            {
                type: FIELD_TYPES["TEXT"],
                key: "Current IT Provider",
                question: "Who currently supports your IT needs?",
                required: false,
            }, 
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Details",
                question: "Please describe your office's needs in a bit more detail:",
                required: false,
            },
            {
                type: FIELD_TYPES["FILE_UPLOAD"], 
                key: "Attachments", 
                question: "Please upload any relevant images here:",
                required: false
            }
        ];
    } else if (serviceTitle === serviceTitles.OFFICE_PRINTING) {
        return [
            {
                type: FIELD_TYPES["NUMBER"],
                key: "Printer Count",
                question: "How many printers does your office need?",
                required: true,
            },
            {
                type: FIELD_TYPES["SELECT"],
                key: "Printer Usage Amount",
                question: "How often will the printer(s) be used?",
                required: true,
                data: {
                    options: ["Lot", "Little", "Not Sure"]
                }
            }, 
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Printer Features",
                question: "What function(s) should these printer(s) have?",
                required: true,
                data: {
                    options: ["Print", "Copy", "Scan", "Fax", "All of the Above"]
                }
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Add-ons",
                question: addOnServiceQuestionText,
                required: true,
                data: {
                    options: ["Supplies (ex: paper, toner, etc.)", "Servicing + Maintenance", "Other IT Services"]
                }
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Notes",
                question: anythingElseQuestionText,
                required: false,
            },
            {
                type: FIELD_TYPES["FILE_UPLOAD"], 
                key: "Attachments", 
                question: "Please upload photos of where the printer will be located, including existing configurations:",
                required: false
            }
        ];
    } else if (serviceTitle === serviceTitles.SUPPLIES) {
        return [
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Supplies",
                question: "What supplies does your office need?",
                required: true,
                data: {
                    options: ["Office Supplies", "Pantry Supplies", "Hygiene & Feminine Supplies", "Cleaning Supplies", "Shipping Supplies", "First Aid Supplies", "Other (specify below)"]
                }
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Add-ons",
                question: addOnServiceQuestionText,
                required: false,
                data: {
                    options: ["Inventory & Stocking", "Organizers & Containers", "Branded Products"]
                }
            },
            { 
                type:  FIELD_TYPES["DATE"], 
                key: "Delivery Date", 
                question: "What date would you like your deliveries to start?", 
                required: true
            },
            {
                type: FIELD_TYPES["SELECT"],
                key: "Delivery Schedule",
                question: "How often would you like delivery?",
                required: true,
                data: {
                    options: ["One-time", "Recurring", "Keep it stocked"]
                }
            },  
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Notes",
                question: anythingElseQuestionText,
                required: false,
            },
            {
                type: FIELD_TYPES["FILE_UPLOAD"], 
                key: "Attachments", 
                question: "Please upload photos of where the supplies will be stocked:",
                required: false
            }
        ];
    } else if (serviceTitle === serviceTitles.BRANDED_PRODUCTS) {
        return [
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Branded Products",
                question: "What branded products does your office need?",
                required: true,
                data: {
                    options: ["Flyers + Stationary", "Swag", "Banners/Posters", "Exhibits/Displays", "Fixed Signs", "Other (specify below)", "Not sure, need help"]
                }
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Quantity",
                question: "Please specify how many of each item your office needs:",
                required: true
            },
            {
                type:  FIELD_TYPES["DATE"],
                key: "Needed By",
                question: "When does your office need these items by?",
                required: true
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Details",
                question: "Please provide us a bit more detail about your needs:",
                required: false
            },
        ];
    } else if (serviceTitle === serviceTitles.SHIPPING) {
        return [
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Current Postal Provider",
                question: "Which mailing service(s) does your office currently use?",
                required: true,
                data: {
                    options: ["FedEx", "UPS", "USPS", "DHL", "Other"]
                }
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Shipment Types",
                question: "Please describe the type of items your office usually ships:",
                required: true,
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Pickup Point",
                question: "If applicable, where is your building's mail pickup point?",
                required: false
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Add-ons",
                question: addOnServiceQuestionText,
                required: false,
                data: {
                    options: ["Shipping Supplies", "Custom Shipping Labels"]
                }
            },
        ];
    } else if (serviceTitle === serviceTitles.WRITABLE_SURFACES) {
        return [
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Surface Type(s)",
                question: "What surfaces do you need to add to your office?",
                required: true,
                data: {
                    options: ["Glassboard", "Whiteboard", "Whiteboard Wall", "Interactive Whiteboard", "Desk", "Other (specify below)"]
                }
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Details",
                question: "Please describe your request in a little more detail:",
                required: false,
            },
            {
                type: FIELD_TYPES["FILE_UPLOAD"], 
                key: "Attachments", 
                question: "Please upload photos of where you would like your writable surface(s):",
                required: false
            }
        ];
    } else if (serviceTitle === serviceTitles.SOUNDPROOFING) {
        return [
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Area(s)",
                question: "What area(s) are your experiencing issues with?",
                required: true,
                data: {
                    options: ["Private Office", "Phone Booth", "Meeting Room", "Common Area/Open Office", "Other (specify below)"]
                }
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Details",
                question: "Please describe the issue in a little more detail:",
                required: false,
            },
            {
                type: FIELD_TYPES["FILE_UPLOAD"], 
                key: "Attachments", 
                question: "Please upload photos of the affected area(s):",
                required: false
            }
        ];
    } else if (serviceTitle === serviceTitles.PLANTS) {
        return [
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Plant Services",
                question: "What would you like help with?",
                required: true,
                data: {
                    options: ["Plants", "Ongoing Care", "Soundproofing Habitats", "Other (specify below)"]
                }
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Details",
                question: "Please describe your request in a bit more detail:",
                required: false,
            },
            {
                type: FIELD_TYPES["FILE_UPLOAD"], 
                key: "Attachments", 
                question: "Please upload photos of where you would like the plants to go:",
                required: false
            }
        ];
    } else if (serviceTitle === serviceTitles.FURNITURE) {
        return [
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Furniture",
                question: "I need to furnish:",
                required: true,
                data: {
                    options: ["Private Office", "Open Plan +  Cubicles", "Meeting Room", "Lounge", "Break Room", "Kitchen", "Reception", "Other"]
                }
            },
            {
                type: FIELD_TYPES["SELECT"],
                key: "Finish Type",
                question: "Please indicate your preferred type of finish:",
                required: true,
                data: {
                    options: ["High-quality", "Budget-friendly", "Matches my current furniture", "Makes a statement", "Open to all options", "Not sure, need help"]
                }
            },
            {
                type: FIELD_TYPES["SELECT"],
                key: "Ownership Schedule",
                question: "How long do you need this furniture for?",
                required: true,
                data: {
                    options: ["Long-term (more than a year)", "Short-term (less than a year)", "Not sure, need help"]
                }
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Details",
                question: "Please describe your request in a bit more detail:",
                required: false,
            }, 
            {
                type: FIELD_TYPES["FILE_UPLOAD"], 
                key: "Attachments", 
                question: "Please upload photos of where the furniture will be located:",
                required: false
            }
        ];
    } else if (serviceTitle === serviceTitles.HEALTH_WELLNESS) {
        return [
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Initiatives",
                question: "What health & wellness initiatives is your office interested in?",
                required: true,
                data: {
                    options: ["Air Quality Monitoring", "Balance Boards", "Standing Desks", "Ergonomic Furniture", "Health + Fitness Programming", "Habitat Soundscaping", "Health Snacks + Drinks", "Green Cleaning", "Not sure, need help"]
                }
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Details",
                question: "Please describe your request in a bit more detail:",
                required: false,
            }
        ];
    } else if (serviceTitle === serviceTitles.HANDY_WORK) {
        return [
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Handywork Services",
                question: "What does your office need help with?",
                required: true,
                data: {
                    options: ["Picture Hanging", "Screen Mounting", "Shelving", "Doors", "Windows", "Appliances", "Locks", "Install Lighting", "Repair Lighting", "Electric", "Sink", "Toilet", "Faucet", "Drain", "Leak","Hot Water", "HVAC", "Other (specify below)"]
                }
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Details",
                question: "Please describe your request in a bit more detail:",
                required: false,
            }, 
            {
                type: FIELD_TYPES["SELECT"],
                key: "Building Labor Requirements",
                question: "Does your building require that you work with certain providers and/or union labor?",
                required: true,
                data: {
                    options: ["Yes", "No", "Not sure, need help"]
                }
            }, 
            {
                type: FIELD_TYPES["FILE_UPLOAD"], 
                key: "Attachments", 
                question: "Please upload photos of the affected area(s):",
                required: false
            }
        ];
    } else if (serviceTitle === serviceTitles.OFFICE_MOVE) {
        return [
            {
                type: FIELD_TYPES["TEXT"],
                key: "Current Office Address",
                question: "What is your office's current address?",
                required: true
            },
            {
                type: FIELD_TYPES["TEXT"],
                key: "New Office Address",
                question: "What is your office's new address?",
                required: true
            },
            {
                type: FIELD_TYPES["SELECT"],
                key: "Union Movers",
                question: "Does your building require union movers?",
                required: true,
                data: {
                    options: ["Yes", "No", "Not sure, need help"]
                }
            },
            {
                type: FIELD_TYPES["DATE"],
                key: "Move Date",
                question: "What date would your office like to start the move on?",
                required: true
            },
            {
                type: FIELD_TYPES["NUMBER"],
                key: "Employee Count",
                question: "How many employees will be moving?",
                required: true
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Current Office Accessibility",
                question: "Please indicate the accessibility of your current office:",
                required: true,
                data: {
                    options: ["Freight Elevator", "Passenger Elevator", "Stairs", "Office on ground floor", "Not Sure, need help"]
                }
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "New Office Accessibility",
                question: "Please indicate the accessibility of your new office:",
                required: true,
                data: {
                    options: ["Freight Elevator", "Passenger Elevator", "Stairs", "Office on ground floor", "Not Sure, need help"]
                }
            },
            {
                type: FIELD_TYPES["FILE_UPLOAD"],
                key: "Attachments",
                question: "Please provide photo(s) of items to be moved:",
                required: false
            },
        ];
    } else if (serviceTitle === serviceTitles.SPACE_MANAGEMENT) {
        return [
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Space Management Services",
                question: "What does your office need help with?",
                required: true,
                data: {
                    options: ["Room Reservation Software", "Space Planning", "Design", "Architecture", "General Contracting", "Other (specify below)"]
                }
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Details",
                question: "Please describe your request in a bit more detail:",
                required: false,
            }, 
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Features",
                question: "Please indicate what features you are hoping to add to your office:",
                required: true,
                data: {
                    options: ["Furniture", "Appliances", "Art", "Lighting", "Wall Color"]
                }
            },
            {
                type: FIELD_TYPES["SELECT"],
                key: "Building Labor Requirements",
                question: "Does your building require that you work with certain providers and/or union labor?",
                required: true,
                data: {
                    options: ["Yes", "No", "Not sure, need help"]
                }
            }, 
            {
                type: FIELD_TYPES["FILE_UPLOAD"],
                key: "Attachments",
                question: "Please provide photo(s) of the affected area(s):",
                required: false
            },
        ];
    } else if (serviceTitle === serviceTitles.SECURITY) {
        return [
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Current Security Provider",
                question: "Please describe your current security provider and/or setup:",
                required: false
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "New Features",
                question: "What security features are you interested in adding?",
                required: true,
                data: {
                    options: ["Guest Registration System", "Access Control", "Security Camera", "Smartphone Control", "Professional Monitoring", "Not sure, need help"]
                }
            },
            {
                type: FIELD_TYPES["NUMBER"],
                key: "# of Entry Points",
                question: "How many entry points does your office have?",
                required: true
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Details",
                question: "Please describe your request in a bit more detail:",
                required: false,
            },
            {
                type: FIELD_TYPES["FILE_UPLOAD"],
                key: "Attachments",
                question: "Please provide photo(s) of any relevant area(s):",
                required: false
            }
        ];
    } else if (serviceTitle === serviceTitles.ONGOING_CLEANING) {
        return [
            {
                type: FIELD_TYPES["NUMBER"],
                key: "Cleanings per Week",
                question: "How many times would you like your office cleaned every week?",
                required: true
            },
            {
                type: FIELD_TYPES["DATE"],
                key: "Start Date",
                question: "When would you like the cleaning to start?",
                required: true
            },
            {
                type: FIELD_TYPES["NUMBER"],
                key: "# of restrooms",
                question: "How many restrooms are in your office?",
                required: true
            },
            {
                type: FIELD_TYPES["NUMBER"],
                key: "# of kitchens/break rooms",
                question: "How many kitchens/break rooms are in your office?",
                required: true
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Flooring Type(s)",
                question: "What type of flooring is in your office?",
                required: true,
                data: {
                    options: ["Waxable", "Hardwood", "Carpet", "Tile", "Rugs", "Other (specify below)"]
                }
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Wall Type(s)",
                question: "What type of walls are in your office?",
                required: true,
                data: {
                    options: ["Exposed Brick", "Glass", "Concrete", "Plaster Slab", "Other (specify below)"]
                }
            },
            {
                type: FIELD_TYPES["SELECT"],
                key: "Building Labor Requirements",
                question: "Does your building require that you work with certain providers and/or union labor?",
                required: true,
                data: {
                    options: ["Yes", "No", "Not sure, need help"]
                }
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Details",
                question: anythingElseQuestionText,
                required: false
            },
            {
                type: FIELD_TYPES["FILE_UPLOAD"],
                key: "Attachments",
                question: "Please upload photo(s) of area(s) to be cleaned:",
                required: false
            }
        ];
    } else if (serviceTitle === serviceTitles.DEEP_CLEANING) {
        return [
            {
                type: FIELD_TYPES["DATE"],
                key: "Start Date",
                question: "When would you like the deep cleaning to start?",
                required: true
            },
            {
                type: FIELD_TYPES["TEXT"],
                key: "Cleaning Schedule",
                question: "How often would your office need a deep clean?",
                required: true
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Flooring Type(s)",
                question: "What type of flooring is in your office?",
                required: true,
                data: {
                    options: ["Waxable", "Hardwood", "Carpet", "Tile", "Rugs", "Other (specify below)"]
                }
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Wall Type(s)",
                question: "What type of walls are in your office?",
                required: true,
                data: {
                    options: ["Exposed Brick", "Glass", "Concrete", "Plaster Slab", "Other (specify below)"]
                }
            },
            {
                type: FIELD_TYPES["SELECT"],
                key: "Building Labor Requirements",
                question: "Does your building require that you work with certain providers and/or union labor?",
                required: true,
                data: {
                    options: ["Yes", "No", "Not sure, need help"]
                }
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Details",
                question: anythingElseQuestionText,
                required: false
            },
            {
                type: FIELD_TYPES["FILE_UPLOAD"],
                key: "Attachments",
                question: "Please upload photo(s) of area(s) to be cleaned:",
                required: false
            }  
        ];
    } else if (serviceTitle === serviceTitles.SPECIALIZED_CLEANING) {
        return [
            {
                type: FIELD_TYPES["SELECT_MULTIPLE_GROUPED"],
                key: "Cleaning Type",
                question: "What type of cleaning does your office need?",
                required: true,
                data: {
                    groups: [
                        { 
                            title: "Walls", 
                            options: ["Exposed Brick Walls", "Glass Walls", "Concrete Walls", "Plaster Slab Walls", "Other Wall Type"]
                        }, 
                        { 
                            title: "Flooring", 
                            options: ["Waxable Flooring", "Hardwood Flooring", "Carpet Flooring", "Tile Flooring", "Rugs", "Other Flooring"]
                        }, 
                        { 
                            title: "More", 
                            options: ["Windows", "Upholestery", "Hazardous Material"]
                        }
                    ]
                }
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Details",
                question: "Please describe the request in a bit more detail:",
                required: true
            },
            {
                type: FIELD_TYPES["DATE"],
                key: "Start Date",
                question: "When would you like the cleaning to start?",
                required: true
            },
            {
                type: FIELD_TYPES["TEXT"],
                key: "Cleaning Schedule",
                question: "How often would your office need this service?",
                required: true
            },
            {
                type: FIELD_TYPES["SELECT"],
                key: "Building Labor Requirements",
                question: "Does your building require that you work with certain providers and/or union labor?",
                required: true,
                data: {
                    options: ["Yes", "No", "Not sure, need help"]
                }
            }, 
            {
                type: FIELD_TYPES["FILE_UPLOAD"],
                key: "Attachments",
                question: "Please upload photo(s) of area(s) to be cleaned:",
                required: false
            }
        ];
    } else if (serviceTitle === serviceTitles.WASTE_REMOVAL) {
        return [
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Waste Removal Service(s)",
                question: "What services does your office need?",
                required: true,
                data: {
                    options: ["Recycling", "Compost", "Landfill", "Heavy Trash", "Hazardous Material", "Other (specify below)"]
                }
            },
            {
                type: FIELD_TYPES["DATE"],
                key: "Start Date",
                question: "When would you like the cleaning to start?",
                required: true
            },
            {
                type: FIELD_TYPES["TEXT"],
                key: "Removal Schedule",
                question: "How often would your office need this service?",
                required: true
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Details",
                question: "Please describe your request in a bit more detail:",
                required: false
            },
            {
                type: FIELD_TYPES["SELECT"],
                key: "Building Labor Requirements",
                question: "Does your building require that you work with certain providers and/or union labor?",
                required: true,
                data: {
                    options: ["Yes", "No", "Not sure, need help"]
                }
            }, 
            {
                type: FIELD_TYPES["FILE_UPLOAD"],
                key: "Attachments",
                question: "Please upload photo(s) of waste to be removed:",
                required: false
            }
        ];
    } else if (serviceTitle === serviceTitles.HAPPY_HOUR) {
        return [
            {
                type: FIELD_TYPES["SELECT"],
                key: "Happy Hour Type",
                question: "Which service are you interested in?",
                required: true,
                data: {
                    options: ["In-Office Happy Hour", "In-Office Happy Hour + Temporary Serving Staff", "Off-Site Happy Hour", "Punch Bowl Happy Hour", "Other (specify below)"]
                }
            },
            { 
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Beer Type(s)",
                question: "Which beer(s) are you interested in?",
                required: false,
                data: {
                    options: ["Local", "Domestic", "International", "Other (specify below)"]
                }
            }, 
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Wine Type(s)",
                question: "What wine(s) are you interested in?",
                required: false,
                data: {
                    options: ["Red", "White", "Rose", "Champagne", "Other (specify below)"]
                }
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Spirit Type(s)",
                question: "What spirit(s) are you interested in?",
                required: false,
                data: {
                    options: ["Rum", "Vodka", "Bourbon", "Gin", "Whiskey", "Tequilla","Other (specify below)"]
                }
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Drink Notes",
                question: "Add any extra notes on necessary drinks here:",
                required: false,
            },
            {
                type: FIELD_TYPES["NUMBER"],
                key: "People Count",
                question: "How many people will be attending?",
                required: true,
            },
            {
                type: FIELD_TYPES["DATE_TIME"],
                key: "Event Time",
                question: "When would you like this event to start?",
                required: true,
            },
            {
                type: FIELD_TYPES["TEXT"],
                key: "Event Schedule",
                question: "How often will this event take place?",
                required: true
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Add-ons",
                question: addOnServiceQuestionText,
                required: false,
                data: {
                    options: ["Kegerator Service", "Pantry Supplies (ex: creamer, sweeteners, stirrers, cups, sleeves, etc.)", "Branded Koozies", "Catering"]
                }
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Details",
                question: anythingElseQuestionText,
                required: false
            }, 
            {
                type: FIELD_TYPES["FILE_UPLOAD"],
                key: "Attachments",
                question: "Please upload photo(s) of the event location:",
                required: false
            }
        ];
    } else if (serviceTitle === serviceTitles.GAME_NIGHT) {
        return [
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Games",
                question: "What games would your office be interested in?",
                required: true,
                data: {
                    options: ["Yard Games (ex: Cornhole, Giant Jenga, Basket Pong, etc.)", "Board Games (ex: Catan, Pandemic, Trouble, etc.)", "Card Games (ex: Poker, UNO, Magic the Gathering, etc.)", "Themed Trivia Nights", "Other (specify below)"]
                }
            },
            {
                type: FIELD_TYPES["NUMBER"],
                key: "People Count",
                question: "How many people will be attending?",
                required: true,
            },
            {
                type: FIELD_TYPES["DATE_TIME"],
                key: "Event Time",
                question: "When will this event start?",
                required: true,
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Add-ons",
                question: addOnServiceQuestionText,
                required: false,
                data: {
                    options: ["Food & Drinks", "Beer & Wine & Spirits", "AV Support", "Finding a Venue", "Decoration/Branding", "Other (specify below)"]
                }
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Details",
                question: anythingElseQuestionText,
                required: false
            },
            {
                type: FIELD_TYPES["FILE_UPLOAD"],
                key: "Attachments",
                question: "Please upload photo(s) of the event location:",
                required: false
            } 
        ];
    } else if (serviceTitle === serviceTitles.HEALTH_FITNESS_PROGRAMMING) {
        return [
            {
                type: FIELD_TYPES["SELECT_MULTIPLE_GROUPED"],
                key: "Programming",
                question: "What programming would your office like?",
                required: true,
                data: {
                    groups: [ 
                        { 
                            title: "Fitness Classes", 
                            options: ["Yoga Classes", "Spinning Classes", "Pilates Classes", "Running Classes","HIIT", "Bootcamps", "Boxing", "Core Workouts", "TRX Workouts", "Dance Classes", "Other Classes"]
                        }, 
                        { 
                            title: "Wellness Events", 
                            options: ["Meditation Classes", "Kombucha Tasting", "Healthy Happy Hour", "Other Wellness Event"]
                        }, 
                        { 
                            title: "Lunch & Learn", 
                            options: ["Ergonomics Lunch & Learn", "Stress Lunch & Learn", "Sleep Lunch & Learn", "Movement Lunch & Learn", "Other Lunch & Learn"]
                        }, 
                        { 
                            title: "More", 
                            options: ["In-Office Wellness Market"]
                        }
                    ]
                }
            },
            {
                type: FIELD_TYPES["NUMBER"],
                key: "People Count",
                question: "How many people will be attending?",
                required: true,
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Programming Schedule",
                question: "How often would your office like this programming?",
                required: true
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Add-ons",
                question: addOnServiceQuestionText,
                required: false,
                data: {
                    options: ["Healthy Snacks + Drinks", "Catering", "Beer & Wine & Spirits", "Finding a Venue", "Other (specify below)"]
                }
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Details",
                question: anythingElseQuestionText,
                required: false
            },
            {
                type: FIELD_TYPES["FILE_UPLOAD"],
                key: "Attachments",
                question: "Please upload photo(s) of the event location(s):",
                required: false
            }  
        ]
    } else if (serviceTitle === serviceTitles.EVENT_PLANNING) {
        return [
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Events",
                question: "What event(s) would your office like?",
                required: true,
                data: {
                    options: ["Game Night", "Happy Hour", "Themed Trivia", "Intelligentsia Coffee Tasting", "Other (specify below)"]
                }
            },
            {
                type: FIELD_TYPES["NUMBER"],
                key: "People Count",
                question: "How many people will be in attendance?",
                required: true
            },
            {
                type: FIELD_TYPES["DATE_TIME"],
                key: "Event Time",
                question: "When will this event take place?",
                required: true
            },
            {
                type: FIELD_TYPES["TEXT"],
                key: "Event Schedule",
                question: "How often will this event take place?",
                required: true
            },
            {
                type: FIELD_TYPES["SELECT_MULTIPLE"],
                key: "Add-ons",
                question: addOnServiceQuestionText,
                required: false,
                data: {
                    options: ["Catering", "Beer & Wine & Spirits", "AV Support", "Finding a Venue", "Decoration/Branding", "Other (specify below)"]
                } 
            },
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Details",
                question: anythingElseQuestionText,
                required: false
            }, 
            {
                type: FIELD_TYPES["FILE_UPLOAD"],
                key: "Attachments",
                question: "Please upload photo(s) of the event location(s):",
                required: false
            } 
        ];
    } else if (serviceTitle === serviceTitles.OTHER_SERVICES){
        return [ 
            {
                type: FIELD_TYPES["TEXT_AREA"],
                key: "Details",
                question: "Please provide some details on what you're looking for.",
                required: true
            },
            {
                type: FIELD_TYPES["FILE_UPLOAD"],
                key: "Attachments",
                question: "Please upload any relevant photos or files.",
                required: false
            }
        ];
    } else {
        return [];
    }
}