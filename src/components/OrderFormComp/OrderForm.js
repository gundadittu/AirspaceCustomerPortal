import React from 'react';
import { connect } from 'react-redux';
import {
    Modal, Form, Input, Radio, InputNumber, Select, Cascader, DatePicker, TimePicker
} from 'antd';
import * as generalActionCreator from '../../store/actions/general';
const { Option } = Select;
const { TextArea } = Input;
const InputGroup = Input.Group;

class OrderForm extends React.Component {

    state = {
        visible: false
    };

    onCreate = () => {
        const orderForm = this.props.form;
        orderForm.validateFields((err, values) => {
            if (err) {
                return;
            }
            const fields = this.getFields(this.props.serviceTitle);

            var arrayLength = fields.length;
            for (var i = 0; i < arrayLength; i++) {
                const item = fields[i];
                const key = item.key;
                const value = values[key] || null;
                item["response"] = value;
            }

            // dispatch backend saga call 
            const payload = {
                serviceType: this.props.serviceTitle,
                serviceDescription: fields,
                selectedOfficeUID: this.props.currentAdminOfficeUID,
                onlyInterested: false,
                onFinish: this.props.onCancel
            };
            // console.log("order service payload:");
            // console.log(payload);
            this.props.addRequestForService(payload);
            return
        });
    }

    getFields(serviceTitle) {
        if (serviceTitle === null) {
            return [];
        } else if (serviceTitle === "Coffee + Tea") {

            const powerSourceChildren = [
                {
                    value: 'My office does have a 110V or 120V power source.',
                    label: 'My office does have a 110V or 120V power source.',
                },
                {
                    value: 'My office does NOT have a 110V or 120V power source.',
                    label: 'My office does NOT have a 110V or 120V power source.',
                },
                {
                    value: 'I do know whether my office has a 110V or 120V power source.',
                    label: 'I do know whether my office has a 110V or 120V power source.',
                }
            ];

            const waterLineChildren = [
                {
                    value: 'My office does have a water line.',
                    label: 'My office does have a water line.',
                    children: powerSourceChildren,
                },
                {
                    value: 'My office does NOT have a water line.',
                    label: 'My office does NOT have a water line.',
                    children: powerSourceChildren,
                },
                {
                    value: 'I am not sure whether my office has a water line.',
                    label: 'I am not sure whether my office has a water line.',
                    children: powerSourceChildren,
                },
            ];

            return [
                {
                    type: "cascader",
                    key: "coffeeType",
                    question: "Coffee Type?",
                    message: "Please tell us what type of coffee you're interested in.",
                    required: true,
                    data: {
                        options: [
                            {
                                value: 'Fresh Brew',
                                label: 'Fresh Brew',
                                children: [
                                    {
                                        value: 'Include Free Grind Service',
                                        label: 'Include Free Grind Service',
                                    },
                                    {
                                        value: 'Do NOT include Free Grind Service',
                                        label: 'Do NOT include Free Grind Service',
                                    },
                                ],
                            },
                            {
                                value: 'Single Serve',
                                label: 'Single Serve',
                            },
                            {
                                value: 'Bean-to-Cup',
                                label: 'Bean-to-Cup',
                            },
                            {
                                value: 'None',
                                label: 'None',
                            }
                        ]
                    }
                },
                {
                    type: "select",
                    key: "coffeePackage",
                    question: "Coffee Package?",
                    message: "Please tell us what package you're interested in.",
                    required: true,
                    data: {
                        options: ["Premium", "Standard", "Budget", "None"]
                    }
                },
                {
                    type: "text",
                    key: "coffeeLocation",
                    question: "Please provide a specific location where the coffee will be served.",
                    message: "Please provide a specific location where the coffee will be served.",
                    required: false
                },
                {
                    type: "cascader",
                    key: "equipmentInstall",
                    question: "Add-on: Do you need to purchase or rent equipment?",
                    message: "Please tell us whether your office needs to purchase or rent equipment.",
                    required: true,
                    data: {
                        options: [
                            {
                                value: "Interested in Purchasing Equipment",
                                label: "Interested in Purchasing Equipment",
                                children: waterLineChildren
                            },
                            {
                                value: "Interested in Renting Equipment",
                                label: "Interested in Renting Equipment",
                                children: waterLineChildren
                            },
                            {
                                value: "Do not need equipment",
                                label: "Do not need equipment",
                            }
                        ]
                    }
                },
                {
                    type: "select",
                    key: "teaType",
                    question: "Tea Type?",
                    message: "Please tell us what type of tea you're interested in.",
                    required: true,
                    data: {
                        options: ["Sachet", "Single Service", "None"]
                    }
                },
                {
                    type: "select",
                    key: "teaPackage",
                    question: "Tea Package?",
                    message: "Please tell us which package you're interested in.",
                    required: true,
                    data: {
                        options: ["Premium", "Standard", "Budget", "None"]
                    }
                },
            ];
        } else if (serviceTitle === "Snacks + Beverages") {
            return [
                {
                    type: "text",
                    key: "snacksDrinksLocation",
                    question: "Please provide a specific location where the snacks + drinks will be served.",
                    message: "Please provide a specific location where the snacks + drinks will be served.",
                    required: true,
                },
                {
                    type: "select",
                    key: "snacksDrinksPackage",
                    question: "Snacks + Drink Package?",
                    message: "Please tell us which package you're interested in.",
                    required: true,
                    data: {
                        options: ["The Loop (e.x. Fiji, RXBar, Terra, Pistachios, Jerky, etc.)", "River North (e.x. Honest Tea, Cliff, Kettle Chips, Almonds, Yogurt, etc.)", "Fulton (e.x.: LaCroix, Nature Valley, Pretzels, Peanuts, Bananas", "Create my Own"]
                    }
                },
                {
                    type: "textArea",
                    key: "createPackage",
                    question: "Please create your own package here or add some more of your office's preferences here.",
                    message: "Please create your own package or add some more of your office's preferences here.",
                    required: false,
                },
                {
                    type: "selectMultiple",
                    key: "addOns",
                    question: "Choose any add-ons your office would like.",
                    message: "Choose any add-ons your office would like.",
                    required: false,
                    data: {
                        options: ["Fresh Fruit", "Organic Fresh Fruit", "Exotic Fruit", "Organic Exotic Fruit"]
                    }
                },
            ];
        } else if (serviceTitle === "Cold Brew") {
            return [
                {
                    type: "cascader",
                    key: "coldBrew-HowOften",
                    question: "How often would you like cold-brew?",
                    message: "Please tell us how often your office would like cold-brew.",
                    required: true,
                    data: {
                        options: [
                            {
                                value: "Recurring",
                                label: "Recurring",
                                children: [
                                    {
                                        value: "Daily",
                                        label: "Daily"
                                    },
                                    {
                                        value: "Weekly",
                                        label: "Weekly"
                                    },
                                    {
                                        value: "Monthly",
                                        label: "Monthly"
                                    }
                                ]
                            },
                            {
                                value: "One-time",
                                label: "One-time",
                            },
                        ]
                    }
                },
                {
                    type: "number",
                    key: "coldBrewCount",
                    question: "Number of cold brew slurpers?",
                    message: "Tell us how many people would like to drink cold brew in your office.",
                    required: true,
                },
                {
                    type: "select",
                    key: "nitro",
                    question: "Would you like nitro cold brew?",
                    message: "Let us know whether you'd like nitro cold brew.",
                    required: true,
                    data: {
                        options: ["Yes", "No"]
                    }
                },
                {
                    type: "select",
                    key: "equipment",
                    question: "Do you need equipment?",
                    message: "Let us know whether you need equipment.",
                    required: true,
                    data: {
                        options: ["Yes", "No"]
                    }
                },
                {
                    type: "text",
                    key: "coldBrewLocation",
                    question: "Please provide a specific location where the cold brew will be served.",
                    message: "Please provide a specific location where the cold brew will be served.",
                    required: true,
                },
            ];
        } else if (serviceTitle === "Beer + Spirits + Wine") {
            return [
                {
                    type: "cascader",
                    key: "alcohol-HowOften",
                    question: "One-time or Recurring Order?",
                    message: "Please tell us how often your office would like this order.",
                    required: true,
                    data: {
                        options: [
                            {
                                value: "Recurring",
                                label: "Recurring",
                                children: [
                                    {
                                        value: "Daily",
                                        label: "Daily"
                                    },
                                    {
                                        value: "Weekly",
                                        label: "Weekly"
                                    },
                                    {
                                        value: "Monthly",
                                        label: "Monthly"
                                    },
                                    {
                                        value: "Other",
                                        label: "Other"
                                    }
                                ]
                            },
                            {
                                value: "One-time",
                                label: "One-time",
                                children: [
                                    {
                                        value: "This order is for an office event.",
                                        label: "This order is for an office event"
                                    },
                                    {
                                        value: "This order is for a different reason.",
                                        label: "This order is for a different reason."
                                    },
                                ]
                            },
                        ]
                    }
                },
                // {
                //     type: "title",
                //     key: "beerTitle",
                //     question: "Beer:"
                // },
                {
                    type: "selectMultiple",
                    key: "beerPackages",
                    question: "Select beer package(s):",
                    message: "Please tell us which package you're interested in.",
                    required: false,
                    data: {
                        options: ["Chicago craft - ex: Half Acre, Goose Island, Metropolitan, Off Color, Three Floyds", "Premium - ex: Sam Adams, Heineken, Blue Moon, Stella", "Budget - ex: Bud Light, Michelob, Coors, Miller"]
                    }
                },
                {
                    type: "text",
                    key: "createBeerPackage",
                    question: "Please create your own beer package here or add some more of your office's preferences here.",
                    message: "Please create your own package or add some more of your office's preferences here.",
                    required: false,
                },
                {
                    type: "selectMultiple",
                    key: "addOns",
                    question: "Choose any add-ons your office would like.",
                    message: "Choose any add-ons your office would like.",
                    required: false,
                    data: {
                        options: ["120 can beer fridge"]
                    }
                },
                // {
                //     type: "title",
                //     key: "wineTitle",
                //     question: "Wine:"
                // },
                {
                    type: "selectMultiple",
                    key: "winePackages",
                    question: "Choose wine package(s):",
                    message: "Please tell us which package(s) you're interested in.",
                    required: false,
                    data: {
                        options: ["Red Wine Trio - 3 red wines priced ~ $14/bottle", "White Wine Trio  - 3 white wines priced ~ $14/bottle", "Champagne Trio   - 3 champagnes priced ~ $40/bottle", " Rose Trio - 3 rose wines priced ~ $14/bottle", "Top Shelf Trio - 3 premium bottles priced ~ $170/bottle"]
                    }
                },
                // {
                //     type: "title",
                //     key: "spiritsTitle",
                //     question: "Spirits:"
                // },
                {
                    type: "select",
                    key: "spiritOptions",
                    question: "Choose spirit(s):",
                    message: "Please tell us which spirit(s) you're interested in.",
                    required: false,
                    data: {
                        options: [
                            "Rum Sailor Jerry Spiced Rum - Price: $22.00/750ml",
                            "Rum Parce Rum 3 Year - Price: $36.00/1L",
                            "Vodka CH Distillery – Chicago Made - Price: $22.00/750ml",
                            "Vodka Tito’s - Price: $24.00/750ml",
                            "Vodka Kettel One - Price: $25.00/750ml",
                            "Bourbon G&W Private Stock - Price: $19.00/750ml",
                            "Bourbon Bulleit - Price: $34.00/750ml",
                            "Bourbon Journeyman Featherbone single barrel - Price: $54.00/750ml",
                            "Gin Hendricks - Price: $44.00/750ml",
                            "Scotch Whiskey The Balvenie DoubleWood 12 year- Price: $64.00/750ml",
                            "Scotch Whiskey Macallan Single Malt 12 Year - Price: $72.00/750ml",
                            "Japanese Whiskey Suntory Toki - Price: $38.00/750ml",
                            "Tequila Espolón Pure Agave Tequila Blanco - Price: $27.00/750ml",
                            "Tequila Casamigos Blanco - Price: $44.00/750ml",
                            "Tequila Casaamigos Roposado - Price: $55.00/750ml",
                            "Other (specify below"
                        ]
                    }
                },
                {
                    type: "text",
                    key: "otherSpirits",
                    question: "Please let us know if there any other spirits you're interested in",
                    message: "Please let us know if there any other spirits you're interested in",
                    required: false,
                },
            ];
        } else if (serviceTitle === "Pantry") {
            return [

                {
                    type: "selectMultiple",
                    key: "pantryOptions",
                    question: "Choose from our list of pantry staples:",
                    message: "Please tell us which items you're interested in.",
                    required: true,
                    data: {
                        options: ["Honey", "Sweeteners", "Creamer", "Salt & Pepper", "Plates", "Cutlery", "Stirrers", "Straws", "Paper Towels", "Napkins", "Dish soap", "Hand soap", "Other (please specify below)"]
                    }
                },
                {
                    type: "text",
                    key: "otherPantryItems",
                    question: "Please let us know if there any other pantry items you're interested in:",
                    message: "Please let us know if there any other spirits you're interested in.",
                    required: false,
                },
                {
                    type: "selectMultiple",
                    key: "addOns",
                    question: "Choose any add-ons your office would like.",
                    message: "Choose any add-ons your office would like.",
                    required: false,
                    data: {
                        options: ["Organizers & Containers"]
                    }
                },
            ];
        } else if (serviceTitle === "Catering") {
            return [
                {
                    type: "selectMultiple",
                    key: "cateringEvents",
                    question: "What event(s) are you catering for?",
                    message: "Let us know what event(s) you are catering for.",
                    required: true,
                    data: {
                        options: ["Breakfast", "Lunch", "Dinner", "Happy Hour", "Light Snacks", "Other (specify below)"]
                    }
                },
                {
                    type: "text",
                    key: "otherEvent",
                    question: "Please let us know if there any other events you're interested in catering for:",
                    message: "Please let us know if there any other events you're interested in catering for.",
                    required: false,
                },
                {
                    type: "cascader",
                    key: "alcohol-HowOften",
                    question: "One-time or Recurring Order?",
                    message: "Please tell us how often your office would like this order.",
                    required: true,
                    data: {
                        options: [
                            {
                                value: "Recurring",
                                label: "Recurring",
                                children: [
                                    {
                                        value: "Daily",
                                        label: "Daily"
                                    },
                                    {
                                        value: "Weekly",
                                        label: "Weekly"
                                    },
                                    {
                                        value: "Monthly",
                                        label: "Monthly"
                                    },
                                    {
                                        value: "Quarterly",
                                        label: "Quarterly"
                                    },
                                    {
                                        value: "Other",
                                        label: "Other"
                                    }
                                ]
                            },
                            {
                                value: "One-time",
                                label: "One-time",
                            },
                        ]
                    }
                },
                {
                    type: "dateTime",
                    key: "eventDateTime",
                    question: "When is the event?",
                    required: true,
                },
                {
                    type: "number",
                    key: "attendeeCount",
                    question: "How many attendees?",
                    required: true,
                },
                {
                    type: "number",
                    key: "priceRange",
                    question: "What price per person are you targeting?",
                    required: true,
                },
                {
                    type: "selectMultiple",
                    key: "dietaryNeeds",
                    question: "Dietary sensitivities?",
                    required: true,
                    data: {
                        options: ["Vegetarian", "Vegan", "Gluten Allergy", "Nut Allergy", "Dairy Intolerance", "Diabetic", "Kosher", "Halal", "None"]
                    }
                },
                {
                    type: "selectMultiple",
                    key: "supplies",
                    question: "Supplies?",
                    required: true,
                    data: {
                        options: ["Silverware", "Napkins", "Plates", "Cups", "Table Cloths", "Plates", "Cups", "None"]
                    }
                },
                {
                    type: "selectMultiple",
                    key: "alcohol",
                    question: "Will alcohol be served?",
                    required: true,
                    data: {
                        options: ["Beer", "Wine", "Mixed Drinks", "Bartender Required", "None"]
                    }
                },
                {
                    type: "text",
                    key: "cateringLocation",
                    question: "Please provide a specific location where the catering will be needed:",
                    // message: "Please provide a specific location where the catering will be needed.",
                    required: true,
                },
                {
                    type: "textArea",
                    key: "otherNotes",
                    question: "Anything else we need to know?",
                    // message: "Please provide a specific location where the catering will be needed.",
                    required: false,
                },
            ];
        } else if (serviceTitle === "Internet") {
            return [
                {
                    type: "cascader",
                    key: "currentInternet",
                    question: "Do you currently have internet service?",
                    required: true,
                    data: {
                        options: [
                            {
                                value: "Yes",
                                label: "Yes",
                                children: [
                                    {
                                        value: "with Comcast",
                                        label: "with Comcast"
                                    },
                                    {
                                        value: "with ATT",
                                        label: "with ATT"
                                    },
                                    {
                                        value: "with Verizon Fios",
                                        label: "with Verizon Fios"
                                    },
                                    {
                                        value: "with Spectrum",
                                        label: "with Spectrum"
                                    },
                                    {
                                        value: "with Cogent",
                                        label: "with Cogent"
                                    },
                                    {
                                        value: "Other",
                                        label: "Other"
                                    },
                                ]
                            },
                            {
                                value: "No",
                                label: "No",
                            },
                        ]
                    }
                },
                {
                    type: "number",
                    key: "userCount",
                    question: "How many users?",
                    required: true,
                },
                {
                    type: "number",
                    key: "averageDeviceCount",
                    question: "Average devices per user?",
                    required: true,
                },
                {
                    type: "date",
                    key: "startDate",
                    question: "When do you need your internet by?",
                    required: true,
                },
                {
                    type: "selectMultiple",
                    key: "internetUse",
                    question: "What do you use your internet for?",
                    required: true,
                    data: {
                        options: ["Web Browsing & Email", "File Sharing", "Video Streaming & Conferencing", "E-Commerce", "Cloud Computing & Storage", "Sever Hosting", "Hard Lines", "Phone Lines", "Other"]
                    }
                },
                {
                    type: "selectMultiple",
                    key: "addOns",
                    question: "Choose any add-ons your office would like:",
                    required: false,
                    data: {
                        options: ["Emergency MiFi Backup Internet", "VOIP"]
                    }
                },
            ];
        } else if (serviceTitle === "Conference Rooms") {
            return [
                {
                    type: "number",
                    key: "videoRooms",
                    question: "How many rooms do you want video-conferencing software for?",
                    required: false,
                },
                {
                    type: "number",
                    key: "audioRooms",
                    question: "How many audio-enabled conference rooms do you need?",
                    required: false,
                },
                {
                    type: "number",
                    key: "audioRooms",
                    question: "How many roaming conference accounts do you need?",
                    required: false,
                },
                {
                    type: "number",
                    key: "audioRooms",
                    question: "Max number attending a given conference call?",
                    required: false,
                },
                {
                    type: "selectMultiple",
                    key: "preferredSoftware",
                    question: "Do you have a preferred software service?",
                    required: false,
                    data: {
                        options: ["Skype", "Zoom", "Uber Conference", "Google Hangouts", "Other", "No Preference"]
                    }
                },
                {
                    type: "selectMultiple",
                    key: "hardwareChoices",
                    question: "What hardware do you need?",
                    required: false,
                    data: {
                        options: ["TV", "Keyboard", "Camera", "Microphone", "All the above", "Other"]
                    }
                }
            ];
        } else if (serviceTitle === "Television Mounting") {
            return [
                {
                    type: "number",
                    key: "mountingCount",
                    question: "How many mountings?",
                    required: true,
                },
                {
                    type: "text",
                    key: "tvSize",
                    question: "What size television(s)?",
                    required: true,
                },
            ];
        } else if (serviceTitle === "Printing") {
            return [
                {
                    type: "select",
                    key: "equipment",
                    question: "What printing package would you like?",
                    required: true,
                    data: {
                        options: ["Printer & Service Combo", "Printer Only"]
                    }
                },
                {
                    type: "number",
                    key: "printerCount",
                    question: "How many printers?",
                    required: true,
                },
                {
                    type: "selectMultiple",
                    key: "functionChoice",
                    question: "What functions would you like your printers to have?",
                    required: true,
                    data: {
                        options: ["Print", "Copy", "Scan", "Fax", "All the Above"]
                    }
                },
                {
                    type: "select",
                    key: "usageChoice",
                    question: "Usage:",
                    required: true,
                    data: {
                        options: ["Heavy Duty", "Light Use"]
                    }
                }
            ];
        } else if (serviceTitle === "IT Services") {
            return [
                {
                    type: "textArea",
                    key: "itNeeds",
                    question: "Describe your IT needs in detail:",
                    required: false,
                },
                {
                    type: "select",
                    key: "supportLevel",
                    question: "What level of support do you need?",
                    required: true,
                    data: {
                        options: ["Consistent monthly IT needs with 24/7 support", "Consistent monthly IT needs with business hours support", " Sporadic needs that vary month to month", "Not Sure"]
                    }
                },
                {
                    type: "select",
                    key: "onSiteSupport",
                    question: "Will you require on-site support?",
                    required: true,
                    data: {
                        options: ["Yes", "No"]
                    }
                },
                {
                    type: "select",
                    key: "multiOfficeSupport",
                    question: "Do you need a multi-office solution?",
                    required: true,
                    data: {
                        options: ["Yes", "No"]
                    }
                },
                {
                    type: "text",
                    key: "currentProvider",
                    question: "Who currently handles your IT needs?",
                    required: false,
                },
            ];
        } else if (serviceTitle === "Furniture") {
            return [
                {
                    type: "select",
                    key: "orderType",
                    question: "Would you like to rent or purchase?",
                    required: true,
                    data: {
                        options: ["Rent", "Purchase", "Not Sure"]
                    }
                },
                {
                    type: "select",
                    key: "packageType",
                    question: "Please select a package:",
                    required: true,
                    data: {
                        options: ["Premium", "Standard"]
                    }
                },
                {
                    type: "select",
                    key: "assembly",
                    question: "Do you need help with assembly?",
                    required: true,
                    data: {
                        options: ["Yes", "No"]
                    }
                },
                {
                    type: "selectMultiple",
                    key: "furnitureType",
                    question: "What type of furniture do you need?",
                    required: true,
                    data: {
                        options: ["Office Furniture", "Cubicle Furniture", "Lounge Furniture", "Break Room Furniture", "Other"]
                    }
                },
                {
                    type: "textArea",
                    key: "details",
                    question: "Please specify in detail what you would like:",
                    required: false,
                },
            ];
        } else if (serviceTitle === "Office Supplies") {
            return [
                {
                    type: "select",
                    key: "current",
                    question: "Do you have whiteboards?",
                    required: true,
                    data: {
                        options: ["Yes", "No"]
                    }
                },
                {
                    type: "number",
                    key: "count",
                    question: "How many whiteboards need to be mounted?",
                    required: true
                },
                {
                    type: "text",
                    key: "size",
                    question: "What size are the whiteboards?",
                    required: true
                },
                {
                    type: "select",
                    key: "material",
                    question: "What materials are the whiteboards?",
                    required: true,
                    data: {
                        options: ["Laminate/Plastic", "Glass"]
                    }
                },
                {
                    type: "textArea",
                    key: "details",
                    question: "Anything else we should know?",
                    required: false,
                },
            ];
        } else if (serviceTitle === "Office Supplies") {
            return [
                {
                    type: "selectMultiple",
                    key: "currentProvider",
                    question: "Where do you get office supplies from currently?",
                    required: true,
                    data: {
                        options: ["Office Depot", "Staples", "Online Service", "Other", "None"]
                    }
                },
                {
                    type: "selectMultiple",
                    key: "currentProvider",
                    question: "Where do you get office supplies from currently?",
                    required: true,
                    data: {
                        options: ["Office Depot", "Staples", "Online Service", "Other", "None"]
                    }
                },
                {
                    type: "selectMultiple",
                    key: "packages",
                    question: "What packages are you interested in?",
                    required: true,
                    data: {
                        options: ["Office supplies", "Bathroom supplies", "Hygiene & feminine needs", "Cleaning supplies", "Shipping supplies", "First aid supplies", "Other"]
                    }
                },
                {
                    type: "selectMultiple",
                    key: "addOns",
                    question: "Add ons:",
                    required: false,
                    data: {
                        options: ["Organizers and containers"]
                    }
                },
            ];
        } else if (serviceTitle === "Plants") {
            return [
                {
                    type: "selectMultiple",
                    key: "packages",
                    question: "What packages are you interested in?",
                    required: true,
                    data: {
                        options: ["Plants & Care", "Plants only"]
                    }
                },
                {
                    type: "textArea",
                    key: "types",
                    question: "What types of plants do you want and how many?",
                    required: true,
                },
            ];
        } else if (serviceTitle === "Postal Services") {
            return [
                {
                    type: "select",
                    key: "currentProvider",
                    question: "What do you use for shipping?",
                    required: true,
                    data: {
                        options: ["FedEx", "UPS", "USPS", "Other"]
                    }
                },
                {
                    type: "textArea",
                    key: "type",
                    question: "What types of items do you normally ship?",
                    required: true,
                },
                {
                    type: "text",
                    key: "location",
                    question: "Where is your designated pickup point?",
                    required: false
                },
                {
                    type: "text",
                    key: "frequency",
                    question: "How often do your send shipments?",
                    required: true
                },
                {
                    type: "selectMultiple",
                    key: "packages",
                    question: "Add ons:",
                    required: false,
                    data: {
                        options: ["Shipping Supplies", "Custom Shipping Labels"]
                    }
                },
            ];
        } else if (serviceTitle === "Signs & Branding") {
            return [
                {
                    type: "selectMultiple",
                    key: "interest",
                    question: "What are you looking for help with?",
                    required: false,
                    data: {
                        options: ["Office signs", "Exterior signs", "Channel letters", "Murals", "Ghost signs", "Menu boards", "Branded Supplies & Swag", "Other"]
                    }
                },
                {
                    type: "textArea",
                    key: "details",
                    question: "Please provide a detailed description of your request:",
                    required: false
                },
                {
                    type: "text",
                    key: "location",
                    question: "Where in the office would you like the sign/branding?",
                    required: false
                },
            ];
        } else if (serviceTitle === "Soundproofing + White Noise") {
            return [
                {
                    type: "select",
                    key: "interest",
                    question: "What is the problem?",
                    required: true,
                    data: {
                        options: ["Too Loud", "Too Quiet"]
                    }
                },
                {
                    type: "textArea",
                    key: "details",
                    question: "Describe the issue in details:",
                    required: true
                },
                {
                    type: "textArea",
                    key: "areas",
                    question: "What areas are affected?",
                    required: true
                },
            ];
        } else if (serviceTitle === "Office Move") {
            return [
                {
                    type: "text",
                    key: "from",
                    question: "Move from address:",
                    required: true
                },
                {
                    type: "text",
                    key: "to",
                    question: "Move to address:",
                    required: true
                },
                {
                    type: "date",
                    key: "date",
                    question: "Date of move:",
                    required: true
                },
                {
                    type: "selectMultiple",
                    key: "elevator",
                    question: "Elevators available:",
                    required: true,
                    data: {
                        option: ["Yes - freight", "Yes - passenger", "No - stairs", "No - ground floor"]
                    }
                },
                {
                    type: "number",
                    key: "count",
                    question: "How many employees are moving?",
                    required: true
                },
                {
                    type: "textArea",
                    key: "list",
                    question: "Please provide a detailed list of items to be packed and moved:",
                    required: true
                },
            ];
        } else if (serviceTitle === "Office Security") {
            return [
                {
                    type: "text",
                    key: "provider",
                    question: "Who do you currently use for security? Would you like to integrate with this system?",
                    required: true
                },
                {
                    type: "text",
                    key: "provider",
                    question: "Who do you currently use for security? Would you like to integrate with this system?",
                    required: true
                },
                {
                    type: "selectMultiple",
                    key: "description",
                    question: "Please describe the security features of the office you envision:",
                    required: true,
                    data: {
                        options: ["Key Fobs/Access Cards", "Bluetooth/Phone Access", "Facial Recognition", "Keypad", "Security Guard - Day", "Security Guard - Night", "Surveillance System", "Video Intercom", "Other"]
                    }
                },
                {
                    type: "number",
                    key: "entry",
                    question: "How many entry points does your office have?",
                    required: true
                },
            ];
        } else if (serviceTitle === "Ongoing Cleaning") {
            return [

            ];
        } else if (serviceTitle === "") {
            return [

            ];
        } else {
            return [];
        }
    }

    render() {

        const { visible, onCancel, serviceTitle, topText, form } = this.props;

        const { getFieldDecorator } = form;
        // --------
        const fields = this.getFields(serviceTitle);

        const confirmLoading = this.props.confirmLoading;

        const onCreate = this.onCreate;

        const formTitle = "Request " + serviceTitle;

        return (
            <div>
                <Modal
                    visible={visible}
                    title={formTitle}
                    okText="Request"
                    onCancel={onCancel}
                    onOk={onCreate.bind(this)}
                    confirmLoading={confirmLoading}
                >
                    <p>{topText}</p>
                    <br></br>
                    <Form layout="vertical">
                        {fields === null ? null : fields.map(x => {
                            const type = x.type || null;
                            const key = x.key || null;
                            const question = x.question || null;
                            const required = x.required || false;
                            const message = x.message || "";
                            const data = x.data || null;
                            if (type === "text") {
                                return (
                                    <Form.Item label={question}>
                                        {getFieldDecorator(key, {
                                            rules: [{ required: required, whitespace: true, message: message }],
                                        })(
                                            <Input disabled={confirmLoading} />
                                        )}
                                    </Form.Item>
                                );
                            } else if (type === "inputGroup") {
                                const groups = data || [];

                                return (
                                    <Form.Item label={question}>
                                        {getFieldDecorator(key, {
                                            rules: [{ required: required, whitespace: true, message: message }],
                                        })(
                                            <InputGroup compact>
                                                {groups.map(x => {
                                                    const type = x.type || null;
                                                    const placeholder = x.placeholder || "";

                                                    if (type === "regular") {
                                                        const options = x.options || [];
                                                        return (
                                                            <Select placeholder={placeholder}>
                                                                {
                                                                    options.map(op => {
                                                                        const value = op.value || "";
                                                                        return (
                                                                            <Option value={value}>{value}</Option>
                                                                        );
                                                                    })
                                                                }
                                                            </Select>
                                                        );
                                                    } else if (type === "number") {
                                                        return (
                                                            <InputNumber min={0} placeholder={placeholder} disabled={confirmLoading} />
                                                        );
                                                    } else {
                                                        return null
                                                    }
                                                })}
                                            </InputGroup>
                                        )}
                                    </Form.Item>
                                );
                            } else if (type === "dateTime") {
                                return (
                                    <Form.Item label={question}>
                                        {getFieldDecorator(key + "-date", {
                                            rules: [{ required: required, message: message }],
                                        })(
                                            <DatePicker format="DD-MM-YYYY" placeholder="Select Date" />
                                        )}
                                        <br /><br />
                                        {getFieldDecorator(key + "-time", {
                                            rules: [{ required: required, message: message }],
                                        })(
                                            <TimePicker use12Hours format="h:mm a" placeholder="Select Time" />
                                        )}
                                    </Form.Item>
                                );
                            } else if (type === "date") {
                                return (
                                    <Form.Item label={question}>
                                        {getFieldDecorator(key + "-date", {
                                            rules: [{ required: required, message: message }],
                                        })(
                                            <DatePicker format="DD-MM-YYYY" placeholder="Select Date" />
                                        )}
                                    </Form.Item>
                                );
                            } else if (type === "title") {
                                return (
                                    <Form.Item label={question}>
                                    </Form.Item>
                                );
                            } else if (type === "number") {
                                return (
                                    <Form.Item label={question}>
                                        {getFieldDecorator(key, {
                                            rules: [{ required: required, message: message }],
                                        })(
                                            <InputNumber min={0} disabled={confirmLoading} />
                                        )}
                                    </Form.Item>
                                );
                            } else if (type === "select") {
                                const options = data.options || [];

                                return (
                                    <Form.Item label={question}>
                                        {getFieldDecorator(key, {
                                            rules: [{ required: required, whitespace: true, message: message }],
                                        })(

                                            <Select
                                                showSearch
                                                // style={{ width: 200 }}
                                                placeholder={message}
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                {options.map(x => (
                                                    <Option value={x}>{x}</Option>
                                                ))}
                                            </Select>
                                        )}
                                    </Form.Item>
                                );
                            } else if (type === "selectMultiple") {
                                const options = data.options || [];

                                return (
                                    <Form.Item label={question}>
                                        {getFieldDecorator(key, {
                                            rules: [{ required: required, message: message }],
                                        })(

                                            <Select
                                                showSearch
                                                // style={{ width: 200 }}
                                                mode="multiple"
                                                placeholder={message}
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                {options.map(x => (
                                                    <Option value={x}>{x}</Option>
                                                ))}
                                            </Select>
                                        )}
                                    </Form.Item>
                                );
                            } else if (type === "cascader") {
                                const options = data.options || [];
                                return (
                                    <Form.Item label={question}>
                                        {getFieldDecorator(key, {
                                            rules: [{ required: required, message: message }],
                                        })(
                                            <Cascader options={options} placeholder={message} />
                                        )}
                                    </Form.Item>
                                );
                            } else if (type === "textArea") {
                                return (
                                    <Form.Item label={question}>
                                        {getFieldDecorator(key, {
                                            rules: [{ required: required, whitespace: true, message: message }],
                                        })(
                                            <TextArea rows={4} disabled={confirmLoading} />
                                        )}
                                    </Form.Item>
                                );
                            }
                            return null;
                        }
                        )}
                    </Form>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        confirmLoading: state.officeAdmin.isAddingRequestForService,
        currentAdminOfficeUID: state.general.currentOfficeAdminUID
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addRequestForService: (payload) => dispatch(generalActionCreator.addRequestForService(payload))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'orderServiceForm' })(OrderForm));

{/* <Form.Item label="First Name">
    {getFieldDecorator('firstName', {
        rules: [{ required: true, whitespace: true, message: 'Please input the user\'s first name.' }],
    })(
        <Input disabled={confirmLoading} />
    )}
</Form.Item>
    <Form.Item label="Last Name">
        {getFieldDecorator('lastName', {
            validateTrigger: 'onBlur',
            rules: [{ required: true, whitespace: true, message: 'Please input the user\'s last name.' }],
        })(
            <Input disabled={confirmLoading} />
        )}
    </Form.Item>
    <Form.Item label="Email Address">
        {getFieldDecorator('emailAddress', {
            validateTrigger: 'onBlur',
            rules: [{ required: true, message: 'Please input the user\'s email address.', whitespace: true, pattern: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/ }],
        })(
            <Input disabled={confirmLoading} />
        )}
    </Form.Item>
    <Form.Item label="Reenter Email Address">
        {getFieldDecorator('emailAddress2', {
            validateTrigger: 'onBlur',
            rules: [{
                required: true,
                whitespace: true,
                message: 'Please input the user\'s email address.'
            },
            {
                validator: this.emailValidator.bind(this)
            }],
        })(
            <Input disabled={confirmLoading} />
        )}
    </Form.Item>

    <Form.Item className="collection-create-form_last-form-item">
        {getFieldDecorator('userType', {
            initialValue: 'regular',
        })(
            <Radio.Group>
                <Radio disabled={confirmLoading} value="regular">Regular</Radio>
                <Radio disabled={confirmLoading} value="officeAdmin">Office Admin</Radio>
            </Radio.Group>
        )}
    </Form.Item>  */}
